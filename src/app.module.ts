import { Module } from '@nestjs/common'
import { TurtleWsModule } from './turtle-ws/turtle-ws.module'
import { ControllersModule } from './controllers/controllers.module'

@Module({
  imports: [TurtleWsModule, ControllersModule],
})
export class AppModule {}
