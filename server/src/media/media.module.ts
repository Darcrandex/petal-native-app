import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import * as dayjs from 'dayjs'
import { diskStorage } from 'multer'
import { uid } from 'src/utils/uid'
import { MediaController } from './media.controller'

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          // 配置文件上传后的文件夹路径
          destination: `./public/uploads/${dayjs().format('YYYY-MM-DD')}`,
          filename: (req, file, cb) => {
            // 在此处自定义保存后的文件名称
            console.log('ffff', file.mimetype)
            console.log('cfg', configService)

            const filename = `${uid()}.${file.mimetype.split('/')[1]}`
            return cb(null, filename)
          },
        }),
      }),
    }),
  ],

  controllers: [MediaController],

  providers: [ConfigService],
})
export class MediaModule {}
