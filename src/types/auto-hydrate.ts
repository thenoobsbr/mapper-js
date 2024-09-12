export interface IAutoHydrateOptions {
  unsafe: boolean
}

export interface IAutoHydrate {
  hydrate<T extends object>(type: Symbol, input: any, options?: IAutoHydrateOptions): T
}