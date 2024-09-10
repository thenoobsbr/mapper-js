import {FactoryType, ICreateMapperConfig} from "./create-mapper-config";
import {Hydrate} from "../hydrate";
import {AutoHydratePropertyConfig} from "../auto-hydrate";

export interface IMapperConfig {
    hasType(type: Symbol): boolean
    instantiate(input: object): object
}

export class MapperConfig<T> implements IMapperConfig {
    constructor(
        public readonly contractType: Symbol,
        private readonly instanceType: FactoryType<T>) {
    }

    static create<T>({type, instanceType}: ICreateMapperConfig<T>): IMapperConfig {
        return new MapperConfig(type, instanceType)
    }

    hasType(type: Symbol): boolean {
        return type === this.contractType
    }

    instantiate(input: object): object {
        const instance = new this.instanceType()
        return this.deepMap(instance, input)
    }


}