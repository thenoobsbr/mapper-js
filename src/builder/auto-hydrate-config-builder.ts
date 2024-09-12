import {
  AutoHydrateConfigPropertyBuilderAction,
  IAutoHydrateConfig,
  IAutoHydrateConfigBuilder,
  IAutoHydrateConfigProperty,
  InstanceType,
} from '../types'
import { AutoHydrateConfig } from '../config'
import { AutoHydrateConfigPropertyBuilder } from './auto-hydrate-config-property-builder'

export class AutoHydrateConfigBuilder implements IAutoHydrateConfigBuilder {
  private _instanceType: InstanceType | undefined
  private _properties: IAutoHydrateConfigProperty[] = []

  constructor(type: InstanceType) {
    this._instanceType = type
  }

  withProperty(config: AutoHydrateConfigPropertyBuilderAction): IAutoHydrateConfigBuilder {
    const builder = new AutoHydrateConfigPropertyBuilder()
    config(builder)
    this._properties.push(builder.build())
    return this
  }

  build(): IAutoHydrateConfig {
    return new AutoHydrateConfig({
      instanceType: this._instanceType,
      properties: this._properties,
    })
  }
}