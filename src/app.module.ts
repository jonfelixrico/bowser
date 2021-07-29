import { Module } from '@nestjs/common'
import { TurtleWsModule } from './turtle-ws/turtle-ws.module'
import { ControllersModule } from './controllers/controllers.module'
import { LoggerModule } from './logger/logger.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.dev.env'],
      isGlobal: true,
    }),
    LoggerModule,
    TurtleWsModule,
    ControllersModule,
  ],
})
export class AppModule {}
