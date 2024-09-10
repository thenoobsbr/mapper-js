import {Mapper} from "../src";
import {Person} from "./stubs";

describe("mapper", () => {
    let mapper: Mapper
    beforeEach(() => {
        mapper = new Mapper()
    })

    it("should register", () => {
        mapper.register({
            type: Symbol.for("Person"),
            instanceType: Person
        })

        expect(mapper.configs.length).toBe(1)
    })

    it("should use hydrate to map when available", () => {
        mapper.register({
            type: Symbol.for("Person"),
            instanceType: Person
        })

        const person = mapper.map<Person>(Symbol.for("Person"), {
            name: "John",
            age: 30,
            birthdate: "1990-01-01",
            addresses: [{
                street: "Main Street",
                number: 1,
                city: "New York"
            }]
        })

        expect(person).not.toBeNull()
        expect(person).toBeInstanceOf(Person)
    })
})