import { Module } from '@nestjs/common'
import { TurtleWsModule } from './turtle-ws/turtle-ws.module'
import { ControllersModule } from './controllers/controllers.module'
import { CommandHandlersModule } from './command-handlers/command-handlers.module'

@Module({
  imports: [TurtleWsModule, ControllersModule, CommandHandlersModule],
})
export class AppModule {}
