import {Hydrate} from "../hydrate";
import {AutoHydratePropertyConfig} from "./property-config";

export interface IAutoHydrateConfig {
    [key: string]: AutoHydratePropertyConfig | undefined
}

export class AutoHydrate extends Hydrate {
    constructor(private readonly _autoHydrateConfig: IAutoHydrateConfig = {}) {
        super()
    }

    hydrate(input: object) {
        for (const key in this) {
            this.set(key, input)
        }
    }

    set(key: string, input: object) {
        const inputValue = input[key]
        const config = this._autoHydrateConfig[key]

        if (config instanceof AutoHydratePropertyConfig) {
            this[key] = config.execute(inputValue, input)
            return
        }

        if (!inputValue) {
            return
        }

        this[key] = inputValue
    }
}