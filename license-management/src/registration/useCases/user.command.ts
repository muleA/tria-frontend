/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsEnum } from 'class-validator';
import { User } from '../domain/user';
import { CreateLicenseApplicantExperienceCommand } from './licenseApplicantExperience.command';
import { CreateLicenseApllicantEducationCommand } from './licenseApllicantEducation.commands';
import { CreateCertificateCommand } from './Certificate.commands';
import { CreateApplicationCommand } from './application.command';
import { LicenseApplicationEntity } from '../persistence/application.entity';
import { LicenseApplication } from '../domain/licenseApplication';
import { License } from '../domain/License';
import { LicenseEntity } from '../persistence/License.entity';

enum GENDERTYPE {
    MALE = "Male",
    Female = "Female",
}
export class CreateUserCommand {
    // @ApiProperty()
    // @IsUUID()
    // @IsNotEmpty()
    id: string
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    accountId: string
    @IsNotEmpty()
    @ApiProperty()
    firstName: string
    @IsNotEmpty()
    @ApiProperty()
    middleName: string
    @IsNotEmpty()
    @ApiProperty()
    lastName: string
    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(GENDERTYPE, {
        message: "CustomerType must be Male or Female",
    })
    gender: GENDERTYPE
    @IsNotEmpty()
    @ApiProperty()
    state: string
    @IsNotEmpty()
    @ApiProperty()

    city: string
    @IsNotEmpty()
    @ApiProperty()
    wereda: string
    @IsNotEmpty()
    @ApiProperty()
    kebele: string
    @IsNotEmpty()
    @ApiProperty()
    phone: string
    @ApiProperty()
    houseNumber: string
    @IsNotEmpty()
    @ApiProperty()
    subCity: string
    @IsNotEmpty()
    @ApiProperty()
    email: string
    @ApiProperty()
    profilePicture: string
    // @ApiProperty()
    education: CreateLicenseApllicantEducationCommand[]
    // @ApiProperty()
    expiriance: CreateLicenseApplicantExperienceCommand[]
    // @ApiProperty()
    certificate: CreateCertificateCommand[]
    // @ApiProperty()
    appliaction: CreateApplicationCommand[]

    @ApiProperty()
    createAt: Date
    // @ApiProperty()
    createdBy: string
    // @ApiProperty()
    UpdatedAt: Date
    // @ApiProperty()
    updatedBy: string
    // @ApiProperty()
    deletedAt: Date
    // @ApiProperty()
    deletedBy: string
    static fromCommands(createUserCommand: CreateUserCommand): User {
        const user: User = new User();
        user.id = createUserCommand.id;
        user.accountId = createUserCommand.accountId;
        user.firstName = createUserCommand.firstName;
        user.middleName = createUserCommand.middleName;
        user.lastName = createUserCommand.lastName;
        user.gender = createUserCommand.gender;
        user.wereda = createUserCommand.wereda;
        user.kebele = createUserCommand.kebele;
        user.city = createUserCommand.city;
        user.phone = createUserCommand.phone;
        user.subCity = createUserCommand.subCity;
        user.houseNumber = createUserCommand.houseNumber;
        user.email = createUserCommand.email;
        user.profilePicture = createUserCommand.profilePicture;
        user.certificate = createUserCommand.certificate?.map((item) =>
            CreateCertificateCommand.fromCommands(item)
        )
        user.education = createUserCommand.education?.map((item) =>
            CreateLicenseApllicantEducationCommand.fromCommands(item)
        );
        user.expiriance = createUserCommand.expiriance?.map((item) =>
            CreateLicenseApplicantExperienceCommand.fromCommands(item),
        );
        user.application = createUserCommand.appliaction?.map((item) =>
            CreateApplicationCommand.fromCommand(item),
        );


        user.createdAt = createUserCommand.createAt
        // user.createdBy = createUserCommand.createdBy
        // user.updatedAt = createUserCommand.UpdatedAt
        // user.updatedBy = createUserCommand.updatedBy
        // user.deletedAt = createUserCommand.deletedAt
        // user.deletedBy = createUserCommand.deletedBy
        return user;
    }
    
}
export class UpdateUserCommand {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    id: string
    @IsNotEmpty()
    @ApiProperty()
    firstName: string
    @IsNotEmpty()
    @ApiProperty()
    middleName: string
    @IsNotEmpty()
    @ApiProperty()
    lastName: string
    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(GENDERTYPE, {
        message: "CustomerType must be Male or Female",
    })
    gender: GENDERTYPE
    @IsNotEmpty()
    @ApiProperty()
    state: string
    @IsNotEmpty()
    @ApiProperty()

    city: string
    @IsNotEmpty()
    @ApiProperty()
    wereda: string
    @IsNotEmpty()
    @ApiProperty()
    kebele: string
    @IsNotEmpty()
    @ApiProperty()
    phone: string
    @ApiProperty()
    houseNumber: string
    @IsNotEmpty()
    @ApiProperty()
    subCity: string
    @IsNotEmpty()
    @ApiProperty()
    email: string
    @ApiProperty()
    profilePicture: string
    // @ApiProperty()
    education: CreateLicenseApllicantEducationCommand[]
    // @ApiProperty()
    expiriance: CreateLicenseApplicantExperienceCommand[]
    // @ApiProperty()
    certificate: CreateCertificateCommand[]
    // @ApiProperty()
    appliaction: CreateApplicationCommand[]

    @ApiProperty()
    createAt: Date
    // @ApiProperty()
    createdBy: string
    // @ApiProperty()
    UpdatedAt: Date
    // @ApiProperty()
    updatedBy: string
    // @ApiProperty()
    deletedAt: Date
    // @ApiProperty()
    deletedBy: string
    static fromCommands(createUserCommand: UpdateUserCommand): User {
        const user: User = new User();
        user.id = createUserCommand.id;
        user.firstName = createUserCommand.firstName;
        user.middleName = createUserCommand.middleName;
        user.lastName = createUserCommand.lastName;
        user.gender = createUserCommand.gender;
        user.wereda = createUserCommand.wereda;
        user.kebele = createUserCommand.kebele;
        user.city = createUserCommand.city;
        user.phone = createUserCommand.phone;
        user.subCity = createUserCommand.subCity;
        user.houseNumber = createUserCommand.houseNumber;
        user.email = createUserCommand.email;
        user.profilePicture = createUserCommand.profilePicture;
        user.certificate = createUserCommand?.certificate?.map((item) =>
            CreateCertificateCommand.fromCommands(item)
        )
        user.education = createUserCommand?.education?.map((item) =>
            CreateLicenseApllicantEducationCommand.fromCommands(item)
        );
        user.expiriance = createUserCommand?.expiriance?.map((item) =>
            CreateLicenseApplicantExperienceCommand.fromCommands(item),
        );
        user.application = createUserCommand?.appliaction?.map((item) =>
            CreateApplicationCommand.fromCommand(item),
        );


        user.createdAt = createUserCommand.createAt
        user.createdBy = createUserCommand.createdBy
        user.updatedAt = createUserCommand.UpdatedAt
        user.updatedBy = createUserCommand.updatedBy
        user.deletedAt = createUserCommand.deletedAt
        user.deletedBy = createUserCommand.deletedBy
        return user;
    }
}