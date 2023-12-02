import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

// 用于配置路由是否需要先登录
export const IS_PUBLIC_KEY = 'isPublic'
export const PublicRoute = () => SetMetadata(IS_PUBLIC_KEY, true)
export const PrivateRoute = () => SetMetadata(IS_PUBLIC_KEY, false)

export type ReqWithUser = Request & { user: { id: string } }

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync<ReqWithUser['user']>(
        token,
        {
          secret: this.configService.get('JWT_SECRECT'),
        },
      )

      // 将解析的 token 信息挂载到 request.user 上
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // 从 header 中获取 token
    // 与前端协定
    const [type, token] = request.headers.authorization?.split(' ') || []
    return type === 'Bearer' ? token : undefined
  }
}
