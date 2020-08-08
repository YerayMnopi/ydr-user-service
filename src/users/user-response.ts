import { Gender } from './gender.enum';
import { Country } from './country-code.enum';

export interface UserResponse {
    id: string,
    image: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    slug: string,
    firstName: string,
    lastName: string,
    email: string,
    validated: boolean,
    birthDate: Date,
    gender: Gender,
    phone: string,
    country: Country,
    city: string,
    address: string,
    postalCode: string,
    commercialCommunications: boolean,
    legitimateInterest: boolean,
    termsAndConditions: boolean
}