import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('media')
export class MediaController {
  // 此处会被 MulterModule 拦截
  // 并完成文件保存
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    console.log('body', body)
    console.log('file', file)

    return { msg: 'ok' }
  }
}
