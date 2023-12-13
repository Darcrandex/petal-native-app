import { Module } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  providers: [DbService],
})
export class UserModule {}
