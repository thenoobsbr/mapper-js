import {Person} from "./person";

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

console.log(person);