import { Module } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { FavoriteController } from './favorite.controller'

@Module({
  controllers: [FavoriteController],
  providers: [DbService],
})
export class FavoriteModule {}
