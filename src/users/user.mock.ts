import { User } from './user.entity';
import { Gender } from './gender.enum';
import { Country } from './country-code.enum';
import * as faker from 'faker';

export const userMockFactory = (): User => {
    const name = faker.name.firstName();

    return {
        id: faker.random.uuid(),
        image: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        name,
        slug: `${name}+${faker.random.number()}`,
        firstName: name,
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        validated: false,
        password: 'password',
        birthDate: new Date(),
        gender: Gender.Female,
        phone: 'test',
        country: Country.AlandIslands,
        city: 'test',
        address: 'test',
        postalCode: 'test',
        commercialCommunications: false,
        legitimateInterest: false,
        termsAndConditions: false
    };
};