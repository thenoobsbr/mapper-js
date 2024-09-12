export class AutoHydrateConfigNotFoundError extends Error {
  constructor(type: Symbol) {
    super(`Auto hydrate config "${type.toString()}" not found`)
  }
}