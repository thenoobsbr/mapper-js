import { IAutoHydrateConfigBuilder, InstanceType } from '../types'

export type AutoHydrateConfigAction = (config: IAutoHydrateConfigBuilder) => void

export interface IAutoHydrateRegister {
  register(type: InstanceType, config?: AutoHydrateConfigAction): void
}