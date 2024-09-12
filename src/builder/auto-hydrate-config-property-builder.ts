import { IAutoHydrateConfigProperty, IAutoHydrateConfigPropertyBuilder, InstanceType } from '../types'
import { AutoHydrateConfigProperty, GetValueFunction } from '../config'

export class AutoHydrateConfigPropertyBuilder implements IAutoHydrateConfigPropertyBuilder {
  private _instanceType: InstanceType | undefined
  private _key: string = ''
  private _getValue: GetValueFunction | undefined
  private _isArray: boolean = false

  withKey(key: string): IAutoHydrateConfigPropertyBuilder {
    this._key = key
    return this
  }

  withType(type: InstanceType): IAutoHydrateConfigPropertyBuilder {
    this._instanceType = type
    return this
  }

  withGetValue(getValue: GetValueFunction): IAutoHydrateConfigPropertyBuilder {
    this._getValue = getValue
    return this
  }

  isArray(): IAutoHydrateConfigPropertyBuilder {
    this._isArray = true
    return this
  }

  build(): IAutoHydrateConfigProperty {
    return new AutoHydrateConfigProperty({
      key: this._key,
      instanceType: this._instanceType,
      getValue: this._getValue,
      isArray: this._isArray,
    })
  }
}