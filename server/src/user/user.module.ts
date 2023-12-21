import { Module } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { MediaModule } from 'src/media/media.module'
import { MediaService } from 'src/media/media.service'
import { UserController } from './user.controller'

@Module({
  imports: [MediaModule],
  controllers: [UserController],
  providers: [DbService, MediaService],
})
export class UserModule {}
