import { InstanceType } from './instance-type'
import { GetValueFunction } from '../config'

export interface IAutoHydrateConfigPropertyBuilder {
  withKey(key: string): IAutoHydrateConfigPropertyBuilder

  withType(type: InstanceType): IAutoHydrateConfigPropertyBuilder

  withGetValue(getValue: GetValueFunction): IAutoHydrateConfigPropertyBuilder

  isArray(): IAutoHydrateConfigPropertyBuilder
}