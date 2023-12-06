import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { networkInterfaces } from 'node:os'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({ origin: '*' })
  }

  const configService = app.get(ConfigService)
  const port = configService.get('NEST_SERVER_PROT') || 3000

  // 静态资源
  app.useStaticAssets('public', { prefix: '/public/' })

  await app.listen(port)

  console.log('\nnestjs server running at:\n')
  const interfaces = networkInterfaces()
  Object.values(interfaces).forEach((value) => {
    value.forEach((item) => {
      if (item.family === 'IPv4') {
        console.log(
          `\thttp://${item.address.replace('127.0.0.1', 'localhost')}:${port}`,
        )
      }
    })
  })
}

bootstrap()
