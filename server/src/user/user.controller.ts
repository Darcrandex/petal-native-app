import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Request,
} from '@nestjs/common'
import { ReqWithUser } from 'src/auth/auth.guard'
import { DbService } from 'src/db/db.service'
import { MediaService } from 'src/media/media.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly db: DbService,
    private readonly mediaService: MediaService,
  ) {}

  @Get('profile')
  async profile(@Request() req: ReqWithUser) {
    if (req.user.id) {
      const user = await this.db.user.findFirst({
        where: { id: req.user.id },
        select: {
          password: false,
          id: true,
          username: true,
          nickname: true,
          avatar: true,
        },
      })

      return {
        ...user,
        avatar: this.mediaService.getAccessPath(user?.avatar || ''),
      }
    } else {
      throw new BadRequestException('请先登录')
    }
  }

  @Put('update')
  async update(@Request() req: ReqWithUser, @Body() data: any) {
    if (req.user.id) {
      return this.db.user.update({ where: { id: req.user.id }, data })
    } else {
      throw new BadRequestException('请先登录')
    }
  }
}
