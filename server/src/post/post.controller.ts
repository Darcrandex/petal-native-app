import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PublicRoute, ReqWithUser } from 'src/auth/auth.guard'
import { DbService } from 'src/db/db.service'

@Controller('post')
export class PostController {
  constructor(private readonly db: DbService) {}

  @Post()
  async create(
    @Request() req: ReqWithUser,
    @Body()
    data: Prisma.PostCreateInput & { favoriteId: string; categoryId?: string },
  ) {
    const { id } = await this.db.post.create({
      data: {
        imageUrl: data.imageUrl,
        imageWidth: data.imageWidth,
        imageHeight: data.imageHeight,
        content: data.content,
        user: { connect: { id: req.user.id } },
        favorites: { connect: { id: data.favoriteId } },
        categories: data.categoryId
          ? { connect: { id: data.categoryId } }
          : undefined,
      },
    })

    return id
  }

  @PublicRoute()
  @Get(':id')
  async findOne(@Param() parmas: { id: string }) {
    return await this.db.post.findUnique({
      where: {
        id: parmas.id,
      },
    })
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.PostUpdateInput) {
    return await this.db.post.update({
      where: { id },
      data,
    })
  }

  @Delete(':id')
  async remove(@Param() parmas: { id: string }) {
    return await this.db.post.delete({
      where: {
        id: parmas.id,
      },
    })
  }

  @PublicRoute()
  @Get()
  async findAll(@Query() parmas: { current?: number; pageSize?: number }) {
    const current = Math.max(1, parmas.current || 1)
    const pageSize = Math.max(1, parmas.pageSize || 10)

    const list = await this.db.post.findMany({
      skip: (current - 1) * pageSize,
      take: pageSize,
      include: {
        user: {
          select: { id: true, username: true, nickname: true, avatar: true },
        },
        favorites: true,
        categories: true,
      },
    })

    const total = await this.db.post.count()
    return { list, total, current, pageSize }
  }
}
