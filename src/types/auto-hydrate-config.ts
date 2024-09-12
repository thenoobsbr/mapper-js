import { IAutoHydrateConfigProperty } from './auto-hydrate-config-property'


export interface IAutoHydrateConfig {
  createInstance(): any

  getProperty(key: string): IAutoHydrateConfigProperty | undefined
}