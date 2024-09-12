import { AutoHydrate } from '../src'
import { Address, Person } from './stubs'
import { AutoHydrateConfigNotFoundError } from '../src/errors'

describe('auto hydrate', () => {
  const createPerson = {
    name: 'Tiago',
    age: 25,
    birthdate: new Date().toISOString(),
    isActive: true,
    address: {
      street: 'Rua dos bobos',
      number: 100,
      city: 'Fazendinha',
    },
    addresses: [{
      street: 'Rua dos bobos',
      number: 100,
      city: 'Fazendinha',
    }],
    toBeIgnored: {
      message: 'this should be ignored',
    },
    nullValue: null,
    undefinedValue: undefined,
  }
  let autoHydrate: AutoHydrate

  beforeEach(() => {
    autoHydrate = new AutoHydrate()
  })

  it('should hydrate a registered person type', () => {
    autoHydrate.register(Person, builder => {
      builder
        .withProperty(builder => {
          builder
            .withKey('address')
            .withType(Address)
        })
        .withProperty(builder => {
          builder
            .withKey('addresses')
            .withType(Address)
            .isArray()
        })
    })
    autoHydrate.register(Address)
    const person = autoHydrate.hydrate<Person>(Symbol.for(Person.name), createPerson)

    expect(person).toBeInstanceOf(Person)
    expect(person.isActive).toEqual(createPerson.isActive)
    expect(person.age).toEqual(createPerson.age)
    expect(person.name).toEqual(createPerson.name)
    expect(person.birthdate).toBeInstanceOf(Date)
    expect(person.birthdate.toISOString()).toEqual(createPerson.birthdate)
    expect(person.address).not.toBeNull()
    expect(person.address).toBeInstanceOf(Address)
    expect(person.address.city).toEqual(createPerson.address.city)
    expect(person.address.number).toEqual(createPerson.address.number)
    expect(person.address.street).toEqual(createPerson.address.street)
    expect(person.addresses).toHaveLength(1)
    expect(person.addresses[0]).toBeInstanceOf(Address)
    expect(person.addresses[0].city).toEqual(createPerson.address.city)
    expect(person.addresses[0].number).toEqual(createPerson.address.number)
    expect(person.addresses[0].street).toEqual(createPerson.address.street)
  })

  it('should hydrate ignoring not owned properties', () => {
    autoHydrate.register(Person, builder => {
      builder
        .withProperty(builder => {
          builder
            .withKey('address')
            .withType(Address)
        })
    })
    autoHydrate.register(Address)
    const person = autoHydrate.hydrate<Person>(Symbol.for(Person.name), createPerson)
    expect(person).not.toHaveProperty('toBeIgnored')
  })

  it('should hydrate even when does not find any config if unsafe', () => {
    const person = autoHydrate.hydrate<Person>(Symbol.for(Person.name), createPerson, { unsafe: true })
    expect(person).not.toBeNull()
    expect(person.isActive).toEqual(createPerson.isActive)
    expect(person.name).toEqual(createPerson.name)
    expect(person.age).toEqual(createPerson.age)
    expect(person.birthdate).toBeInstanceOf(Date)
    expect(person.birthdate.toISOString()).toEqual(createPerson.birthdate)
    expect(person.address).not.toBeNull()
    expect(person.address.city).toEqual(createPerson.address.city)
    expect(person.address.number).toEqual(createPerson.address.number)
    expect(person.address.street).toEqual(createPerson.address.street)
    expect(person.addresses).toHaveLength(1)
    expect(person.addresses[0].city).toEqual(createPerson.address.city)
    expect(person.addresses[0].number).toEqual(createPerson.address.number)
    expect(person.addresses[0].street).toEqual(createPerson.address.street)
  })

  it('should throw an error if type is not registered', () => {
    expect(() => autoHydrate.hydrate(Symbol.for('Person'), createPerson))
      .toThrow(AutoHydrateConfigNotFoundError)
  })


})