import { AutoHydrateStrategy, IAutoHydrateExecutionParams } from '../types'

export class ObjectAutoHydrateStrategy extends AutoHydrateStrategy {
  execute({
            autoHydrate,
            instance,
            key,
            value,
          }: IAutoHydrateExecutionParams) {
    instance[key] = autoHydrate.hydrate(Object, value, { unsafe: true })
  }
}