import { IAutoHydrate } from '../types'
import { AutoHydrateStrategy } from './auto-hydrate-strategy'

export class ArrayAutoHydrateStrategy extends AutoHydrateStrategy {
  constructor(private readonly autoHydrate: IAutoHydrate) {
    super()
  }

  execute(instance: any, key: string, value: any) {
    instance[key] = value.map((x: any) => this.autoHydrate.hydrate(Symbol.for('Object'), x, { unsafe: true }))
  }
}