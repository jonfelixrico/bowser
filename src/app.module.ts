import { Module } from '@nestjs/common'
import { ControllersModule } from './controllers/controllers.module'
import { LoggerModule } from './logger/logger.module'
import { ConfigModule } from '@nestjs/config'
import { CommandHandlersModule } from './command-handlers/command-handlers.module'
import { WebsocketsModule } from './websockets/websockets.module'
import { RepositoriesModule } from './repositories/repositories.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.dev.env'],
      isGlobal: true,
    }),
    LoggerModule,
    ControllersModule,
    CommandHandlersModule,
    WebsocketsModule,
    RepositoriesModule,
  ],
})
export class AppModule {}
