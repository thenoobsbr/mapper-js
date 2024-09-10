export type FactoryType<T extends object> = new(...args: never[]) => T

export interface ICreateMapperConfig<T extends object> {
    type: Symbol
    instanceType: FactoryType<T>
}