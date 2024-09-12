export type KeyValueObjectType = { [key: string]: any }

export abstract class AutoHydrateStrategy {
  abstract execute(instance: KeyValueObjectType, key: string, value: any): void
}