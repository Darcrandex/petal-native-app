import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { DbService } from 'src/db/db.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRECT'),
          signOptions: { expiresIn: '60s' },
        }
      },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, DbService],
})
export class AuthModule {}
