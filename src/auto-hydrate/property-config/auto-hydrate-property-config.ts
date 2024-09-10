export abstract class AutoHydratePropertyConfig {
    abstract execute(value: object, input: object): unknown
}

