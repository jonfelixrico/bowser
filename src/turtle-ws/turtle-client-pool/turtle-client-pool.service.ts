import { Injectable } from '@nestjs/common'

@Injectable()
export class TurtleClientPoolService {
  private internalPool: Record<string, WebSocket>

  add(key: string, client: WebSocket) {
    this.internalPool[key] = client
  }

  removeViaKey(key: string) {
    const client = this.internalPool[key]
    delete this.internalPool[key]
    return client || null
  }

  removeViaClient(client: WebSocket) {
    const entry = Object.entries(this.internalPool).find(
      (entry) => entry[1] === client,
    )

    if (!entry) {
      return null
    }

    return this.removeViaKey(entry[0])
  }

  get pool() {
    return {
      ...this.internalPool,
    }
  }
}
