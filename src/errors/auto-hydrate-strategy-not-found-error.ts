export class AutoHydrateStrategyNotFoundError extends Error {
  constructor(strategy: Symbol) {
    super(`Auto hydrate strategy not found: ${strategy.toString()}`)
  }
}