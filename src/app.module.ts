import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TurtleWsModule } from './turtle-ws/turtle-ws.module'
import { ControllersModule } from './controllers/controllers.module'

@Module({
  imports: [TurtleWsModule, ControllersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
