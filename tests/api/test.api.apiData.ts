import { faker } from "@faker-js/faker"

export const apiUserData = {
  name: faker.person.firstName('male'),
  lastname: faker.person.lastName('male'),
  email: '',
  password: faker.internet.password(),

};

apiUserData.email = `${apiUserData.name}${faker.number.int(100)}@gmail.com`;