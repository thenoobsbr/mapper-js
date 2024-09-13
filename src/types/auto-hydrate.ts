import { InstanceType } from './instance-type'

export interface IAutoHydrateOptions {
  unsafe: boolean
}

export interface IAutoHydrate {
  hydrate<T extends object>(type: InstanceType, input: any, options?: IAutoHydrateOptions): T
}