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
import { networkInterfaces } from 'node:os'
import { PublicRoute } from 'src/auth/auth.guard'

@Controller('media')
export class MediaController {
  constructor(private readonly configService: ConfigService) {}

  // 此处会被 MulterModule 拦截
  // 并完成文件保存
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return file.path
  }

  // 可能后续的业务逻辑需要将图片的地址进行转发
  @PublicRoute()
  @Get('access-path')
  getAccessPaths(@Query('imageUrl') imageUrl: string) {
    console.log('imageUrl', imageUrl)

    const interfaces = networkInterfaces()
    const firstIp = Object.values(interfaces)
      .flatMap((value) =>
        value.filter(
          (item) => item.family === 'IPv4' && item.address !== '127.0.0.1',
        ),
      )
      .map((item) => item.address)[0]

    const port = this.configService.get('NEST_SERVER_PROT') || 3000

    // return `http://${firstIp}:${port}/public/uploads/2023-12-07/123.jpg`
    return `http://${firstIp}:${port}/${imageUrl}`
  }
}
