import { AutoHydrateStrategy, KeyValueObjectType } from './auto-hydrate-strategy'

export class IsoDateAutoHydrateStrategy extends AutoHydrateStrategy {
  execute(instance: KeyValueObjectType, key: string, value: any) {
    instance[key] = new Date(value)
  }
}