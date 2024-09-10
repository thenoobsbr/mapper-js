import {Address, Person} from "./stubs";

describe("auto hydrate", () => {
    const createPerson = {
        name: "Tiago",
        age: 25,
        birthdate: new Date().toISOString(),
        addresses: [{
            street: "Rua dos bobos",
            number: 100,
            city: "Fazendinha"
        }]
    }

    it("should instantiate a person", () => {
        const person = Person.create(createPerson);

        expect(person).not.toBeNull()
        expect(person).toBeInstanceOf(Person)
    })

    it("should hydrate a person", () => {
        const person = Person.create(createPerson);

        expect(person.name).toBe(createPerson.name)
        expect(person.age).toBe(createPerson.age)
        expect(person.birthdate).toBeInstanceOf(Date)
        expect(person.birthdate.toISOString()).toBe(createPerson.birthdate)
        expect(person.primaryAddress).toBeInstanceOf(Address)
        expect(person.primaryAddress.street).toBe(createPerson.addresses[0].street)
        expect(person.primaryAddress.number).toBe(createPerson.addresses[0].number)
        expect(person.primaryAddress.city).toBe(createPerson.addresses[0].city)
        expect(person.addresses).toHaveLength(1)
        expect(person.addresses[0]).toBeInstanceOf(Address)
        expect(person.addresses[0].street).toBe(createPerson.addresses[0].street)
        expect(person.addresses[0].number).toBe(createPerson.addresses[0].number)
        expect(person.addresses[0].city).toBe(createPerson.addresses[0].city)
    })
})