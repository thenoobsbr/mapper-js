import {Hydrate} from "../hydrate";
import {AutoHydratePropertyConfig} from "./property-config";
import {FactoryType} from "../mapper";

export interface IAutoHydrateConfig {
    [key: string]: AutoHydratePropertyConfig | undefined
}

type ObjectType = {[key: string]: any}

export class AutoHydrate<T extends object> extends Hydrate {
    constructor(
        private readonly _instanceType: FactoryType<T>,
        private readonly _autoHydrateConfig: IAutoHydrateConfig = {}) {
        super()
    }

    hydrate(input: object) {
        const instance = new this._instanceType()
        return this.deepMap(instance, input)
    }

    deepMap(instance: T, input: object): any {
        for (const key in instance) {
            instance[key] = this.getValue(key, input)
        }

        return instance
    }

    getValue(key: string, input: ObjectType) {
        if (!input.hasOwnProperty(key)) {
            return
        }

        const inputValue = input[key]
        const config = this._autoHydrateConfig[key]

        if (config instanceof AutoHydratePropertyConfig) {
            return config.execute(inputValue, input)
        }

        if (!inputValue || this.isPrimitive(inputValue)) {
            return inputValue
        }

        if (Array.isArray(inputValue)) {
            return inputValue.map(x => this.mapObject(x))
        }

        return this.mapObject(inputValue)
    }

    mapObject(input: object) {
        const value: ObjectType = {}
        for (const key in input) {
            value[key] = this.getValue(key, input)
        }
        return value
    }

    isPrimitive(value: any): boolean {
        return typeof value === "string" || typeof value === "number" || typeof value === "boolean"
    }
}