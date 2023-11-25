import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DbService } from 'src/db/db.service'

@Controller('post')
export class PostController {
  constructor(private readonly db: DbService) {}

  @Post()
  async create(@Body() data: Prisma.PostCreateInput) {
    const { id } = await this.db.post.create({ data })

    return id
  }

  @Get()
  async findAll(@Query() parmas: { page?: number; pageSize?: number }) {
    const page = Math.max(1, parmas.page || 1)
    const pageSize = Math.max(1, parmas.pageSize || 10)

    return await this.db.post.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
  }

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
