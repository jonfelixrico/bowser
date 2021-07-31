import { NestFactory } from '@nestjs/core'
import { WsAdapter } from '@nestjs/platform-ws'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useWebSocketAdapter(new WsAdapter(app))
  // TODO remove during prod, maybe?
  app.enableCors()
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  await app.listen(3000)
}
bootstrap()
