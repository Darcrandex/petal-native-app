import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CateModule } from './cate/cate.module'
import { DbService } from './db/db.service'
import { PostModule } from './post/post.module'
import { MediaModule } from './media/media.module'
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
    AuthModule,
    CateModule,
    MediaModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
