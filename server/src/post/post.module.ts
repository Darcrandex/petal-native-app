import { Module } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { PostController } from './post.controller'

@Module({
  controllers: [PostController],
  providers: [DbService],
})
export class PostModule {}
