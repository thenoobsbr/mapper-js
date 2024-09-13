import {
  AutoHydrateConfigAction,
  DumbObject,
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
    const symbol = Symbol.for(type.name)
    const config = this.configs.get(symbol)

    if (!options?.unsafe && !config) {
      throw new AutoHydrateConfigNotFoundError(symbol)
    }

    const instance = config?.createInstance() ?? new type()
    Object.keys(instance instanceof DumbObject ? input : instance).forEach(key => {
      const value = input[key]

      const property = config?.getProperty(key)
      if (property) {
        instance[key] = property.getValue({
          autoHydrate: this,
          value,
        })
        return
      }

      if (!options?.unsafe && !instance.hasOwnProperty(key)) {
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