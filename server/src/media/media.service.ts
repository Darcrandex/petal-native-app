import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { networkInterfaces } from 'node:os'

@Injectable()
export class MediaService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * @description 根据图片的地址获取图片在当前部署环境的访问路径
   * @param staticFileUrl 图片资源保存的 url 路径
   */
  getAccessPath(staticFileUrl: string) {
    const interfaces = networkInterfaces()
    const firstIp = Object.values(interfaces)
      .flatMap((value) =>
        value.filter(
          (item) => item.family === 'IPv4' && item.address !== '127.0.0.1',
        ),
      )
      .map((item) => item.address)[0]

    const port = this.configService.get('NEST_SERVER_PROT') || 3000

    return `http://${firstIp}:${port}/${staticFileUrl}`
  }
}
