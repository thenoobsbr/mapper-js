import {AutoHydratePropertyConfig} from "./auto-hydrate-property-config";

export class AutoHydratePropertyConfigCollection extends AutoHydratePropertyConfig {
    constructor(private readonly config: AutoHydratePropertyConfig) {
        super();
    }

    execute(value: object, input: object) {
        if (!Array.isArray(value)) {
            return undefined
        }
        return value.map(x => this.config.execute(x, input))
    }
}