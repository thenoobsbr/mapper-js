import {
  AutoHydrateConfigAction,
  IAutoHydrate,
  IAutoHydrateConfig,
  IAutoHydrateOptions,
  IAutoHydrateRegister,
  InstanceType,
} from './types'
import { AutoHydrateConfigBuilder } from './builder'
import { AutoHydrateConfigNotFoundError } from './errors'
import { AutoHydrateStrategyFactory } from './factories'

export class AutoHydrate implements IAutoHydrateRegister, IAutoHydrate {
  private readonly configs = new Map<Symbol, IAutoHydrateConfig>()

  constructor(private readonly strategyFactory: AutoHydrateStrategyFactory = new AutoHydrateStrategyFactory()) {
  }


  register(type: InstanceType, config: AutoHydrateConfigAction = (_) => {
  }) {
    const builder = new AutoHydrateConfigBuilder(type)
    config(builder)
    this.configs.set(Symbol.for(type.name), builder.build())
  }

  hydrate<T extends object>(type: InstanceType, input: any, options: IAutoHydrateOptions = { unsafe: false }): T {
    const config = this.configs.get(Symbol.for(type.name))

    if (!options?.unsafe && !config) {
      throw new AutoHydrateConfigNotFoundError(Symbol.for(type.name))
    }

    const instance = config?.createInstance() ?? new type()
    Object.entries(input).forEach(([key, value]) => {
      if (!options?.unsafe && !instance.hasOwnProperty(key)) {
        return
      }

      const property = config?.getProperty(key)
      if (property) {
        instance[key] = property.getValue({
          autoHydrate: this,
          value,
        })
        return
      }

      const strategy = this.strategyFactory.get(value)
      strategy?.execute({
        autoHydrate: this, instance, key, value,
      })
    })
    return <T>instance
  }
}