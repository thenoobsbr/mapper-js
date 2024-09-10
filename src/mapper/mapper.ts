import {IMapperConfig, MapperConfig} from "./mapper-config";
import {TypeNotFound} from "../errors";
import {ICreateMapperConfig} from "./create-mapper-config";

export class Mapper {
    public readonly configs: IMapperConfig[] = []

    register<T>(createConfig: ICreateMapperConfig<T>) {
        this.configs.unshift(MapperConfig.create(createConfig))
    }

    map<T>(type: Symbol, input: object): T {
        const config = this.configs.find(config => config.hasType(type))

        if (!config) {
            throw new TypeNotFound(type)
        }

        return config.instantiate(input) as T
    }
}