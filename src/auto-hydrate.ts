import {
  AutoHydrateStrategy,
  IsoDateAutoHydrateStrategy,
  ObjectAutoHydrateStrategy,
  PrimitiveAutoHydrateStrategy,
} from './strategies'
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
import { ArrayAutoHydrateStrategy } from './strategies/array-auto-hydrate-strategy'

export class AutoHydrate implements IAutoHydrateRegister, IAutoHydrate {
  private strategies = new Map<Symbol, AutoHydrateStrategy>([
    [Symbol.for('string'), new PrimitiveAutoHydrateStrategy()],
    [Symbol.for('number'), new PrimitiveAutoHydrateStrategy()],
    [Symbol.for('boolean'), new PrimitiveAutoHydrateStrategy()],
    [Symbol.for('iso-date'), new IsoDateAutoHydrateStrategy()],
    [Symbol.for('object'), new ObjectAutoHydrateStrategy(this)],
    [Symbol.for('array'), new ArrayAutoHydrateStrategy(this)],
  ])
  private configs = new Map<Symbol, IAutoHydrateConfig>()

  private static calculateStrategy(value: any): Symbol {
    if (value === undefined || value === null) {
      return Symbol.for('none')
    }

    if (Array.isArray(value)) {
      return Symbol.for('array')
    }

    switch (typeof value) {
      case 'number':
        return Symbol.for('number')
      case 'boolean':
        return Symbol.for('boolean')
      case 'object':
        return Symbol.for('object')
      default:
        return AutoHydrate.isIsoDate(value) ? Symbol.for('iso-date') : Symbol.for('string')
    }
  }

  private static isIsoDate(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z$/.test(value)
  }

  register(type: InstanceType, config: AutoHydrateConfigAction = (_) => {
  }) {
    const builder = new AutoHydrateConfigBuilder(type)
    config(builder)
    this.configs.set(Symbol.for(type.name), builder.build())
  }

  hydrate<T extends object>(type: Symbol, input: any, options: IAutoHydrateOptions = { unsafe: false }): T {
    const config = this.configs.get(type)

    if (!options?.unsafe && !config) {
      throw new AutoHydrateConfigNotFoundError(type)
    }

    const instance = config?.createInstance() ?? {}
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

      const strategy = this.strategies.get(AutoHydrate.calculateStrategy(value))
      strategy?.execute(instance, key, value)
    })
    return <T>instance
  }
}