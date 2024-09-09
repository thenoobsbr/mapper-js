import {AutoHydratePropertyConfigFunction, HydrateFunction} from "./auto-hydrate-property-config-function";
import {AutoHydratePropertyConfigDate} from "./auto-hydrate-property-config-date";
import {AutoHydratePropertyConfigObject, HydrateObject} from "./auto-hydrate-property-config-object";
import {Hydrate} from "../../hydrate";
import {AutoHydratePropertyConfigMap, MapFunction} from "./auto-hydrate-property-config-map";
import {AutoHydratePropertyConfig} from "./auto-hydrate-property-config";

export * from "./auto-hydrate-property-config"
export * from "./auto-hydrate-property-config-function"
export * from "./auto-hydrate-property-config-object"
export * from "./auto-hydrate-property-config-date"
export * from "./auto-hydrate-property-config-map"

export const PropertyConfigs = {
    fn: (fn: HydrateFunction) => new AutoHydratePropertyConfigFunction(fn),
    date: () => new AutoHydratePropertyConfigDate(),
    object: <T extends Hydrate>(objectType: HydrateObject<T>) => new AutoHydratePropertyConfigObject<T>(objectType),
    map: (mapFunction: MapFunction, config: AutoHydratePropertyConfig) => new AutoHydratePropertyConfigMap(mapFunction, config)
}