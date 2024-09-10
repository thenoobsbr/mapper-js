export type HydrateType<T extends Hydrate> = new(...args: never[]) => T

export abstract class Hydrate {
    abstract hydrate(input: object): void
}