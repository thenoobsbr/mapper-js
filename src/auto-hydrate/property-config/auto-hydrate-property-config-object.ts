import {Hydrate, HydrateType} from "../../hydrate";
import {AutoHydratePropertyConfig} from "./auto-hydrate-property-config";


export class AutoHydratePropertyConfigObject<T extends Hydrate> extends AutoHydratePropertyConfig {
    constructor(private readonly hydrateObject: HydrateType<T>) {
        super();
    }

    execute(value: object, input: object) {
        const object = new this.hydrateObject();
        object.hydrate(value);
        return object;
    }
}