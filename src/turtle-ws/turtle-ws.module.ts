import { Module } from '@nestjs/common'
import { TurtleWsGateway } from './turtle-ws.gateway'

@Module({
  providers: [TurtleWsGateway],
})
export class TurtleWsModule {}
