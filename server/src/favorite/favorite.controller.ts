import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ReqWithUser } from 'src/auth/auth.guard'
import { DbService } from 'src/db/db.service'

// 业务场景，每个用户最多能创建 100 个收藏夹
const MAX_FAVORITES = 100

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly db: DbService) {}

  @Post()
  async create(
    @Request() req: ReqWithUser,
    @Body() data: Prisma.FavoriteCreateInput,
  ) {
    const count = await this.db.favorite.count({
      where: { userId: req.user.id },
    })

    if (count >= MAX_FAVORITES) {
      throw new BadRequestException('收藏夹数量已达上限')
    }

    const created = await this.db.favorite.create({
      data: { ...data, user: { connect: { id: req.user.id } } },
    })

    return created.id
  }

  @Get(':id ')
  async findOne(@Param() parmas: { id: string }) {
    return await this.db.favorite.findUnique({
      where: { id: parmas.id },
    })
  }

  @Get('user')
  async getAllForUser(@Request() req: ReqWithUser) {
    return await this.db.favorite.findMany({
      take: MAX_FAVORITES,
      where: { userId: req.user.id },
    })
  }
}
