import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FileInterceptor } from '@nestjs/platform-express'
import { PublicRoute } from 'src/auth/auth.guard'
import { MediaService } from './media.service'

@Controller('media')
export class MediaController {
  constructor(
    private readonly configService: ConfigService,
    private readonly mediaService: MediaService,
  ) {}

  // 此处会被 MulterModule 拦截
  // 并完成文件保存
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return file.path
  }

  @PublicRoute()
  @Get('access-path')
  getAccessPath(@Query('imageUrl') imageUrl: string) {
    return this.mediaService.getAccessPath(imageUrl)
  }
}
