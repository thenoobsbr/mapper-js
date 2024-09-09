import {Hydrate} from "../../hydrate";
import {AutoHydratePropertyConfig} from "./auto-hydrate-property-config";

export type HydrateObject<T extends Hydrate> = new(...args: never[]) => T

export class AutoHydratePropertyConfigObject<T extends Hydrate> extends AutoHydratePropertyConfig {
    constructor(private readonly hydrateObject: HydrateObject<T>) {
        super();
    }

    execute(value: object, input: object) {
        const object = new this.hydrateObject();
        object.hydrate(value);
        return object;
    }
}