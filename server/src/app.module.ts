import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbService } from './db/db.service'
import { PostModule } from './post/post.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
