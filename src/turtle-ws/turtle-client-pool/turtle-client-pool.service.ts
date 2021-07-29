import { Injectable } from '@nestjs/common'

@Injectable()
export class TurtleClientPoolService {
  private internalPool: Record<string, WebSocket> = {}

  private get entries() {
    return Object.entries(this.internalPool)
  }

  add(key: string, client: WebSocket) {
    this.internalPool[key] = client
  }

  findViaKey(key: string): [string, WebSocket] {
    const client = this.internalPool[key]

    if (!client) {
      return null
    }

    return [key, client]
  }

  findByClient(client: WebSocket): [string, WebSocket] {
    const entry = this.entries.find((e) => e[1] === client)
    return entry || null
  }

  removeViaKey(key: string) {
    const client = this.internalPool[key]
    delete this.internalPool[key]
    return client || null
  }

  removeViaClient(clientToRemove: WebSocket): [string, WebSocket] {
    const entry = this.findByClient(clientToRemove)

    if (!entry) {
      return null
    }

    this.removeViaKey(entry[0])

    return entry
  }
}
