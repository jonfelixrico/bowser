import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TurtleWsModule } from './turtle-ws/turtle-ws.module'

@Module({
  imports: [TurtleWsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
