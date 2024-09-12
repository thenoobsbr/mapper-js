import { IAutoHydrate, IAutoHydrateConfigProperty, InstanceType } from '../types'

export interface IAutoHydrateConfigPropertyParams {
  key: string
  instanceType: InstanceType | undefined
  getValue: GetValueFunction | undefined
  isArray: boolean
}

export interface IGetValueParams {
  autoHydrate: IAutoHydrate
  value: any
}

export type GetValueFunction = (getValue: IGetValueParams) => any

export class AutoHydrateConfigProperty implements IAutoHydrateConfigProperty {
  private readonly _key: string
  private readonly _getValue: GetValueFunction | undefined
  private readonly _instanceType: InstanceType | undefined
  private readonly _isArray: boolean

  constructor({
                key,
                instanceType,
                getValue,
                isArray,
              }: IAutoHydrateConfigPropertyParams) {
    this._key = key
    this._instanceType = instanceType
    this._getValue = getValue
    this._isArray = isArray
  }


  get instanceType(): InstanceType | undefined {
    return this._instanceType
  }

  get key(): string {
    return this._key
  }

  getValue(getValue: IGetValueParams): any {
    if (this._getValue) {
      return this._getValue.call(this, getValue)
    }

    if (this._isArray) {
      return this.getArrayValue(getValue)
    }

    return this.getObjectValue(getValue)
  }

  getArrayValue(getValue: IGetValueParams): any {
    if (!this._instanceType) {
      return [
        ...getValue.value,
      ]
    }
    return getValue.value.map((value: any) => getValue.autoHydrate.hydrate(Symbol.for(this._instanceType!.name), value))
  }

  getObjectValue(getValue: IGetValueParams): any {
    if (!this._instanceType) {
      return getValue.value
    }
    return getValue.autoHydrate.hydrate(Symbol.for(this._instanceType.name), getValue.value)
  }
}