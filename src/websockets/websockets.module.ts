import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TurtleClientPoolService } from './turtle-client-pool/turtle-client-pool.service'
import { TurtleWsGateway } from './turtle-ws-gateway/turtle-ws.gateway'

@Module({
  imports: [CqrsModule],
  providers: [TurtleClientPoolService, TurtleWsGateway],
  exports: [TurtleClientPoolService],
})
export class WebsocketsModule {}
