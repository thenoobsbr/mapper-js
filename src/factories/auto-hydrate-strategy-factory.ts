import { AutoHydrateStrategy, InstanceType } from '../types'
import {
  ArrayAutoHydrateStrategy,
  IsoDateAutoHydrateStrategy,
  ObjectAutoHydrateStrategy,
  PrimitiveAutoHydrateStrategy,
} from '../strategies'
import { AutoHydrateStrategyNotFoundError } from '../errors/auto-hydrate-strategy-not-found-error'

export class AutoHydrateStrategyFactory {
  private strategies = new Map<Symbol, AutoHydrateStrategy>([
    [Symbol.for('string'), new PrimitiveAutoHydrateStrategy()],
    [Symbol.for('number'), new PrimitiveAutoHydrateStrategy()],
    [Symbol.for('boolean'), new PrimitiveAutoHydrateStrategy()],
    [Symbol.for('iso-date'), new IsoDateAutoHydrateStrategy()],
    [Symbol.for('object'), new ObjectAutoHydrateStrategy()],
    [Symbol.for('array'), new ArrayAutoHydrateStrategy()],
  ])

  private static getSymbolForValue(value: unknown): Symbol {
    if (value === undefined || value === null) {
      return Symbol.for('none')
    }

    if (typeof value === 'symbol') {
      return value
    }

    if (Array.isArray(value)) {
      return Symbol.for('array')
    }

    if (value.hasOwnProperty('name')) {
      return Symbol.for((<any>value).name)
    }

    switch (typeof value) {
      case 'number':
        return Symbol.for('number')
      case 'boolean':
        return Symbol.for('boolean')
      case 'object':
        return Symbol.for('object')
      default:
        return AutoHydrateStrategyFactory.isIsoDate(value as string) ? Symbol.for('iso-date') : Symbol.for('string')
    }
  }

  private static isIsoDate(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z$/.test(value)
  }

  register(type: Symbol, strategy: AutoHydrateStrategy) {
    this.strategies.set(type, strategy)
  }

  get(type: InstanceType | Symbol | unknown): AutoHydrateStrategy | undefined {
    return this.strategies.get(AutoHydrateStrategyFactory.getSymbolForValue(type))
  }

  getRequired(type: InstanceType | Symbol | unknown): AutoHydrateStrategy {
    const strategy = this.get(type)

    if (!strategy) {
      throw new AutoHydrateStrategyNotFoundError(AutoHydrateStrategyFactory.getSymbolForValue(type))
    }

    return strategy
  }
}