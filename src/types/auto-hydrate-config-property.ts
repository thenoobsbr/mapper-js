import { InstanceType } from './instance-type'
import { IGetValueParams } from '../config'

export interface IAutoHydrateConfigProperty {
  readonly key: string
  readonly instanceType: InstanceType | undefined

  getValue(getValue: IGetValueParams): any
}