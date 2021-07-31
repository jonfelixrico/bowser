import { Injectable } from '@nestjs/common'

export interface ITurtleStatus {
  x: number
  y: number
  z: number
  bearing: number
  fuelLevel: number
  fuelLimit: number
  label: string
  timestamp: Date
}

export interface IStoredTurtleStatus extends ITurtleStatus {
  id: string
}

@Injectable()
export class TurtleStatusRepositoryService {
  private store: Record<string, Readonly<IStoredTurtleStatus>> = {}

  updateStatus(id: string, status: ITurtleStatus) {
    this.store[id] = Object.freeze({
      ...status,
      id,
    })
  }

  get statusMap() {
    return { ...this.store }
  }
}
