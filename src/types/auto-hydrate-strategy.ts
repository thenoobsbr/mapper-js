import { IAutoHydrate } from './auto-hydrate'

export type KeyValueObjectType = { [key: string]: any }

export interface IAutoHydrateExecutionParams {
  instance: KeyValueObjectType
  key: string
  value: any
  autoHydrate: IAutoHydrate
}

export abstract class AutoHydrateStrategy {
  abstract execute(parameters: IAutoHydrateExecutionParams): void
}