import { AutoHydrateStrategy, IAutoHydrateExecutionParams } from '../types'

export class IsoDateAutoHydrateStrategy extends AutoHydrateStrategy {
  execute({
            instance,
            key,
            value,
          }: IAutoHydrateExecutionParams) {
    instance[key] = new Date(value)
  }
}