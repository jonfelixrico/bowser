import { Module } from '@nestjs/common'
import { TurtleWsGateway } from './turtle-ws.gateway'
import { TurtleClientPoolService } from './turtle-client-pool/turtle-client-pool.service'

@Module({
  providers: [TurtleWsGateway, TurtleClientPoolService],
})
export class TurtleWsModule {}
