import { AutoHydrateStrategy, KeyValueObjectType } from './auto-hydrate-strategy'
import { IAutoHydrate } from '../types'

export class ObjectAutoHydrateStrategy extends AutoHydrateStrategy {
  constructor(private readonly autoHydrate: IAutoHydrate) {
    super()
  }

  execute(instance: KeyValueObjectType, key: string, value: KeyValueObjectType) {
    instance[key] = this.autoHydrate.hydrate(Symbol.for('Object'), value, { unsafe: true })
  }
}