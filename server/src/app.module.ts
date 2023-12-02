import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { DbService } from './db/db.service'
import { PostModule } from './post/post.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}