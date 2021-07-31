import { Module } from '@nestjs/common'
import { TurtleModule } from './turtle/turtle.module'
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
    TurtleModule,
    ControllersModule,
  ],
})
export class AppModule {}
