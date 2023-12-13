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

@Controller('user')
export class UserController {
  constructor(private readonly db: DbService) {}

  @Get('profile')
  async profile(@Request() req: ReqWithUser) {
    if (req.user.id) {
      return this.db.user.findFirst({
        where: { id: req.user.id },
        select: { password: false },
      })
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
