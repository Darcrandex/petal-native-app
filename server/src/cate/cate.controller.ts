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

@Controller('cate')
export class CateController {
  constructor(private readonly db: DbService) {}

  @Get()
  async findAll(@Query() query: { page?: number; pageSize?: number }) {
    const page = Math.max(1, query.page || 1)
    const pageSize = Math.max(1, query.pageSize || 10)
    const list = await this.db.category.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    const total = await this.db.category.count()
    return { list, total, page, pageSize }
  }

  @Post()
  async create(@Body() data: Prisma.CategoryCreateInput) {
    const { id } = await this.db.category.create({ data })
    return id
  }

  @Delete(':id')
  async remove(@Param() parmas: { id: string }) {
    return await this.db.category.delete({
      where: { id: parmas.id },
    })
  }
}
