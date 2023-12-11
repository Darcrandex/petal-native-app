import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { DbService } from 'src/db/db.service'
import { AuthController } from './auth.controller'
import { AuthGuard } from './auth.guard'

@Module({
  imports: [
    // module 在注入时依赖其他的 module
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRECT'),
          signOptions: { expiresIn: '1d' },
        }
      },
    }),
  ],

  controllers: [AuthController],
  providers: [
    DbService,

    // 注册为全局守卫
    // 此时所有的路由都默认为私有路由
    // 都需要先登录
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
