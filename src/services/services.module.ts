import { Module } from '@nestjs/common'
import { SseStreamsService } from './sse-streams/sse-streams.service'

@Module({
  providers: [SseStreamsService],
  exports: [SseStreamsService],
})
export class ServicesModule {}
