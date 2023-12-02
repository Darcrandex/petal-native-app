import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { omit } from 'ramda'
import { DbService } from 'src/db/db.service'
import { PublicRoute, ReqWithUser } from './auth.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly db: DbService,
    private readonly jwtService: JwtService,
  ) {}

  @PublicRoute()
  @Post('registry')
  async registry(@Body() data: Prisma.UserCreateInput) {
    const saltOrRounds = 10
    const password = data.password
    const hash = await bcrypt.hash(password, saltOrRounds)

    const user = await this.db.user.create({
      data: { username: data.username, password: hash },
    })

    return user.id
  }

  @PublicRoute()
  @Post('login')
  async login(
    @Body() data: Pick<Prisma.UserCreateInput, 'username' | 'password'>,
  ) {
    const matchedUser = await this.db.user.findFirst({
      where: { username: data.username },
    })

    if (matchedUser) {
      const isMatch = await bcrypt.compare(data.password, matchedUser.password)

      if (isMatch) {
        const token = await this.jwtService.signAsync(
          omit(['password'], matchedUser),
        )
        return token
      }
    }

    throw new UnauthorizedException('用户名或密码错误')
  }

  @Get('/profile')
  async profile(@Request() req: ReqWithUser) {
    if (req.user.id) {
      return this.db.user.findFirst({ where: { id: req.user.id } })
    } else {
      throw new BadRequestException('请先登录')
    }
  }

  @PublicRoute()
  @Get('users')
  async getAllUsers() {
    return await this.db.user.findMany()
  }
}
