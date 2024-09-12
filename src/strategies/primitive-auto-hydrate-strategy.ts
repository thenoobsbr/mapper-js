import { AutoHydrateStrategy, KeyValueObjectType } from './auto-hydrate-strategy'

export class PrimitiveAutoHydrateStrategy extends AutoHydrateStrategy {
  execute(instance: KeyValueObjectType, key: string, value: any) {
    instance[key] = value
  }
}