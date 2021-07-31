import { Module } from '@nestjs/common'
import { SseStreamsService } from './sse-streams/sse-streams.service'

@Module({
  providers: [SseStreamsService],
})
export class ServicesModule {}
