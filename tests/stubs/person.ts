export class Address {
  street: string = ''
  number: number = 0
  city: string = ''
}

export class Person {
  isActive: boolean = false
  name: string = ''
  age: number = 0
  birthdate: Date = null!
  address: Address = null!
  addresses: Address[] = []
}