import { AutoHydrateStrategy, IAutoHydrateExecutionParams } from '../types'

export class ArrayAutoHydrateStrategy extends AutoHydrateStrategy {
  execute({
            autoHydrate,
            instance,
            key,
            value,
          }: IAutoHydrateExecutionParams) {
    instance[key] = value.map((x: any) => autoHydrate.hydrate(Object, x, { unsafe: true }))
  }
}