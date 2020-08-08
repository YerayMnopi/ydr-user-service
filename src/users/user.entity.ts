import { Entity, Column } from "typeorm";
import { SlugeableEntity } from "ydr-nest-common";
import { IsEmail, IsNotEmpty, IsString, MinLength, IsBoolean, IsEnum } from 'class-validator';
import { Gender } from "./gender.enum";
import { Country } from "./country-code.enum";
import { MyEncryptionTransformerConfig } from "./encryption-config";
import { EncryptionTransformer } from "typeorm-encrypted";

@Entity('users')
export class User extends SlugeableEntity {

    @Column({ type: 'varchar', length: 255 })
    @IsString()
    @MinLength(2)
    firstName: string;

    @Column({ type: 'varchar', length: 255 })
    @IsString()
    @MinLength(2)
    lastName: string;

    @Column('varchar', {unique: true, nullable: false})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column('bool', {default: false})
    @IsBoolean()
    validated: boolean = false;

    @Column('varchar', { 
        nullable: false,
        transformer: new EncryptionTransformer(MyEncryptionTransformerConfig)
    })
    password: string;

    @Column('date', {
        default: '1970-01-01',
        nullable: true
    })
    birthDate: Date;

    @Column('varchar', {length: 1, default: Gender.NoAnswer })
    gender: Gender;

    @Column({ type: 'varchar', length: 255, default: null, nullable: true })
    phone: string | null;



    // LOCATION
    @Column('enum', {enum: Country, nullable: true})
    @IsEnum(Country)
    country: Country;

    @Column({ type: 'varchar', length: 255 })
    @IsString()
    @MinLength(2)
    city: string;

    @Column({ type: 'varchar', length: 255 })
    @IsString()
    @MinLength(2)
    address: string;

    @Column({ type: 'varchar', length: 255 })
    @IsString()
    @MinLength(2)
    postalCode: string;



    // GRPC
    @Column('bool', {default: false})
    @IsBoolean()
    commercialCommunications: boolean = false;

    @Column('bool', {default: false})
    @IsBoolean()
    legitimateInterest: boolean = false;

    @Column('bool', {default: false})
    @IsBoolean()
    termsAndConditions: boolean = false;

}