import { Module } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { MediaModule } from 'src/media/media.module'
import { MediaService } from 'src/media/media.service'
import { PostController } from './post.controller'

@Module({
  imports: [MediaModule],
  controllers: [PostController],
  providers: [DbService, MediaService],
})
export class PostModule {}
