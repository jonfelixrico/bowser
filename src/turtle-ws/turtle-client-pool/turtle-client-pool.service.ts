import { Injectable } from '@nestjs/common'

@Injectable()
export class TurtleClientPoolService {
  private internalPool: Record<string, WebSocket> = {}

  add(key: string, client: WebSocket) {
    this.internalPool[key] = client
  }

  removeViaKey(key: string) {
    const client = this.internalPool[key]
    delete this.internalPool[key]
    return client || null
  }

  removeViaClient(clientToRemove: WebSocket): [string, WebSocket] {
    const entry = Object.entries(this.internalPool).find(
      (entry) => entry[1] === clientToRemove,
    )

    if (!entry) {
      return null
    }

    const [key, client] = entry
    this.removeViaKey(key)

    return [key, client]
  }

  get pool() {
    return {
      ...this.internalPool,
    }
  }
}
