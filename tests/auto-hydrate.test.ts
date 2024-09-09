import {describe, it} from "node:test"
import * as assert from "node:assert"
import {Person} from "@/stubs";

describe("auto hydrate", () => {
    it("should hydrate", () => {
        const data = {
            name: "Tiago",
            age: 25,
            birthdate: new Date().toISOString(),
            addresses: [{
                street: "Rua dos bobos",
                number: 100,
                city: "Fazendinha"
            }]
        }

        const person = Person.create(data);
        assert.notEqual(person, null)
    })
})