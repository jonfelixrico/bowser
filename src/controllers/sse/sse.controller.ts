import { Controller, Sse } from '@nestjs/common'
import { SseStreamsService } from 'src/services/sse-streams/sse-streams.service'

@Controller('sse')
export class SseController {
  constructor(private streams: SseStreamsService) {}

  @Sse()
  createSse() {
    const stream = this.streams.getStream('hardcoded-value')
    try {
      return stream
    } finally {
      this.streams.sendToStream('hardcoded-value', {
        type: 'CONNECTION_ACK',
        data: 'ok',
      })
    }
  }
}
