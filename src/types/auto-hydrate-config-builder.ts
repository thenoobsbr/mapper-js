import { IAutoHydrateConfigPropertyBuilder } from './auto-hydrate-config-property-builder'

export type AutoHydrateConfigPropertyBuilderAction = (builder: IAutoHydrateConfigPropertyBuilder) => void

export interface IAutoHydrateConfigBuilder {
  withProperty(builder: AutoHydrateConfigPropertyBuilderAction): IAutoHydrateConfigBuilder
}