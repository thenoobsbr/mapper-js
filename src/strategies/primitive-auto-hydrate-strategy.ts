import { AutoHydrateStrategy, IAutoHydrateExecutionParams } from '../types'

export class PrimitiveAutoHydrateStrategy extends AutoHydrateStrategy {
  execute({
            instance,
            key,
            value,
          }: IAutoHydrateExecutionParams) {
    instance[key] = value
  }
}