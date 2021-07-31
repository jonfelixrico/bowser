import { Module } from '@nestjs/common'
import { ControllersModule } from './controllers/controllers.module'
import { LoggerModule } from './logger/logger.module'
import { ConfigModule } from '@nestjs/config'
import { TurtleClientPoolService } from './gateways/turtle-client-pool/turtle-client-pool.service'
import { TurtleWsGateway } from './gateways/turtle-ws-gateway/turtle-ws.gateway'
import { SendMessageToTurtleCommandHandlerService } from './command-handlers/send-message-to-turtle-command-handler/send-message-to-turtle-command-handler.service'
import { TurtleStatusRepositoryService } from './repositories/turtle-status-repository/turtle-status-repository.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.dev.env'],
      isGlobal: true,
    }),
    LoggerModule,
    ControllersModule,
  ],

  providers: [
    TurtleClientPoolService,
    TurtleWsGateway,
    SendMessageToTurtleCommandHandlerService,
    TurtleStatusRepositoryService,
  ],
})
export class AppModule {}
