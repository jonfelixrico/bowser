import { Controller, Sse } from '@nestjs/common'
import { SseStreamsService } from 'src/services/sse-streams/sse-streams.service'

@Controller('sse')
export class SseController {
  constructor(private streams: SseStreamsService) {}

  @Sse()
  createSse() {
    // TODO make the stream id unique per session
    return this.streams.getStream('hardcoded-value')
  }
}
