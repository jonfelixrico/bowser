import { Injectable } from '@nestjs/common'

@Injectable()
export class TurtleClientPoolService {
  private internalPool: Record<string, WebSocket>

  add(key: string, client: WebSocket) {
    this.internalPool[key] = client
  }

  remove(key: string) {
    const client = this.internalPool[key]
    delete this.internalPool[key]
    return client
  }

  get pool() {
    return {
      ...this.internalPool,
    }
  }
}
