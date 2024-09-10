import {
    AutoHydratePropertyConfigCollection,
    AutoHydratePropertyConfigDate,
    AutoHydratePropertyConfigFunction,
    AutoHydratePropertyConfigMap,
    AutoHydratePropertyConfigObject,
    HydrateFunction,
    MapFunction,
    AutoHydratePropertyConfig
} from "./property-config";
import {Hydrate, HydrateType} from "../hydrate";

export const PropertyConfigs = {
    fn: (fn: HydrateFunction) => new AutoHydratePropertyConfigFunction(fn),
    date: () => new AutoHydratePropertyConfigDate(),
    object: <T extends Hydrate>(objectType: HydrateType<T>) => new AutoHydratePropertyConfigObject<T>(objectType),
    map: (mapFunction: MapFunction, config: AutoHydratePropertyConfig) => new AutoHydratePropertyConfigMap(mapFunction, config),
    collection: (itemConfig: AutoHydratePropertyConfig) => new AutoHydratePropertyConfigCollection(itemConfig)
}