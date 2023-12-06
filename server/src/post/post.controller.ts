import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
    @Body() data: Prisma.PostCreateInput,
  ) {
    const { id } = await this.db.post.create({
      data: { ...data, user: { connect: { id: req.user.id } } },
    })

    return id
  }

  @PublicRoute()
  @Get()
  async findAll(@Query() parmas: { page?: number; pageSize?: number }) {
    const page = Math.max(1, parmas.page || 1)
    const pageSize = Math.max(1, parmas.pageSize || 10)

    return await this.db.post.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
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

  @Delete(':id')
  async remove(@Query() parmas: { id: string }) {
    return await this.db.post.delete({
      where: {
        id: parmas.id,
      },
    })
  }
}
