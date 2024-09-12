import { IAutoHydrateConfig, IAutoHydrateConfigProperty, InstanceType } from '../types'

export interface IAutoHydrateConfigParams {
  instanceType: InstanceType | undefined
  properties: IAutoHydrateConfigProperty[]
}

export class AutoHydrateConfig implements IAutoHydrateConfig {
  private readonly _instanceType: InstanceType
  private readonly _properties: IAutoHydrateConfigProperty[]

  constructor({
                instanceType,
                properties,
              }: IAutoHydrateConfigParams) {
    this._instanceType = instanceType ?? Object
    this._properties = properties
  }

  createInstance() {
    return new this._instanceType()
  }

  getProperty(key: string): IAutoHydrateConfigProperty | undefined {
    return this._properties.find(x => x.key === key)
  }
}