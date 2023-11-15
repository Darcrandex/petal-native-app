import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { networkInterfaces } from 'node:os'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  const configService = app.get(ConfigService)
  const port = configService.get('NEST_SERVER_PROT') || 3000

  await app.listen(port)

  console.log('nestjs server start\n')
  const interfaces = networkInterfaces()
  Object.values(interfaces).forEach((value) => {
    value.forEach((item) => {
      if (item.family === 'IPv4') {
        console.log(`\thttp://${item.address}:${port}`)
      }
    })
  })
}

bootstrap()
