import {AutoHydratePropertyConfig} from "./auto-hydrate-property-config";

export type HydrateFunction = (value: unknown, input: object) => unknown

export class AutoHydratePropertyConfigFunction extends AutoHydratePropertyConfig {
    constructor(private readonly hydrateFunction: HydrateFunction) {
        super();
    }

    execute(value: unknown, input: object) {
        return this.hydrateFunction(value, input);
    }
}