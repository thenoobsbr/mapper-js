import {AutoHydratePropertyConfig} from "./auto-hydrate-property-config";

export type MapFunction = (input: {[key: string]: any}) => object

export class AutoHydratePropertyConfigMap extends AutoHydratePropertyConfig {
    constructor(private readonly mapFunction: MapFunction,
                private readonly config: AutoHydratePropertyConfig) {
        super();
    }

    execute(_: object, input: object) {
        return this.config.execute(this.mapFunction(input), input);
    }
}