import { Module } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { CateController } from './cate.controller'

@Module({
  controllers: [CateController],
  providers: [DbService],
})
export class CateModule {}
