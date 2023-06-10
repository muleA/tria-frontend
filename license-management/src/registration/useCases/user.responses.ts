/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../persistence/user.entity';
import { CertificateResponse } from './certificate.response';
import { ExperienceResponses } from './experience.responses ';
import { EducationResponse } from './education.response';
import { User } from '../domain/user';
import { ApplicationResponse } from './applicatopn.response';
import { AccountResponse } from './account.response';
import { LicenseResponse } from './License.response';
export class UserResponse {

    @ApiProperty()
    id: string
    @ApiProperty()
    accountId: string
    @ApiProperty()
    firstName: string
    @ApiProperty()
    middleName: string
    @ApiProperty()
    lastName: string
    @ApiProperty()
    gender: string
    @ApiProperty()
    city: string
    @ApiProperty()
    wereda: string
    @ApiProperty()
    kebele: string
    @ApiProperty()
    phone: string
    @ApiProperty()
    houseNumber: string
    @ApiProperty()
    subCity: string
    @ApiProperty()
    email: string
    @ApiProperty()
    education: EducationResponse[]
    @ApiProperty()
    expiriance: ExperienceResponses[]
    @ApiProperty()
    certificate: CertificateResponse[]
    @ApiProperty()
    appliaction: ApplicationResponse[]
    @ApiProperty()
    account: AccountResponse
    @ApiProperty()
    license  : LicenseResponse[]

    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    createdBy: string
    @ApiProperty()
    updatedAt: Date
    @ApiProperty()
    updatedBy: string
    @ApiProperty()
    deletedAt: Date
    @ApiProperty()
    deletedBy: string
    static fromEntity(userentity: UserEntity): UserResponse {
        const userResponse = new UserResponse();
        userResponse.id = userentity.id;
        userResponse.accountId = userentity.accountId;
        userResponse.firstName = userentity.firstName;
        userResponse.firstName = userentity.firstName;
        userResponse.lastName = userentity.lastName;
        userResponse.gender = userentity.gender;
        userResponse.wereda = userentity.wereda;
        userResponse.kebele = userentity.kebele;
        userResponse.city = userentity.city;
        userResponse.phone = userentity.phone;
        userResponse.subCity = userentity.subCity;
        userResponse.houseNumber = userentity.houseNumber;
        userResponse.email = userentity.email;
        userResponse.account=userentity.account ?AccountResponse.fromEntity(userentity?.account):null
        userResponse.certificate = userentity?.certificate?.map((item) =>
            CertificateResponse.fromEntity(item)
        )
        userResponse.education = userentity?.education?.map((item) =>
            EducationResponse.fromEntity(item)
        );
        userResponse.expiriance = userentity?.expiriance?.map((item) =>
            ExperienceResponses.fromEntity(item),
        );
        userResponse.appliaction = userentity?.applications?.map((item) =>
            ApplicationResponse.fromEntity(item),
        );
        userResponse.license = userentity?.license?.map((item) =>
            LicenseResponse.fromEntity(item),
        );


        userResponse.createdAt = userentity.createdAt
        userResponse.createdBy = userentity.createdBy
        userResponse.updatedAt = userentity.updatedAt
        userResponse.updatedBy = userentity.updatedBy
        userResponse.deletedAt = userentity.deletedAt
        userResponse.deletedBy = userentity.deletedBy
        return userResponse;
    }
    static fromDomain(user: User): UserResponse {
        const userResponse = new UserResponse();
        userResponse.id = user.id;
        userResponse.accountId = user.accountId;
        userResponse.firstName = user.firstName;
        userResponse.firstName = user.firstName;
        userResponse.lastName = user.lastName;
        userResponse.gender = user.gender;
        userResponse.wereda = user.wereda;
        userResponse.kebele = user.kebele;
        userResponse.city = user.city;
        userResponse.phone = user.phone;
        userResponse.subCity = user.subCity;
        userResponse.houseNumber = user.houseNumber;
        userResponse.email = user.email;
        // userResponse.account=user?.account?AccountResponse.fromDomain(user.account):null
        userResponse.certificate = user?.certificate?.map((item) =>
            CertificateResponse.fromDomain(item)
        )
        userResponse.education = user?.education?.map((item) =>
            EducationResponse.fromDomain(item)
        );
        userResponse.expiriance = user?.expiriance?.map((item) =>
            ExperienceResponses.fromDomain(item),
        );
        
        userResponse.appliaction=user?.application?.map((element)=>
        ApplicationResponse.fromDomain(element)
        )
        userResponse.license = user?.license?.map((item) =>
            LicenseResponse.fromDomain(item),
        );
        userResponse.createdAt = user.createdAt
        userResponse.createdBy = user.createdBy
        userResponse.updatedAt = user.updatedAt
        userResponse.updatedBy = user.updatedBy
        userResponse.deletedAt = user.deletedAt
        userResponse.deletedBy = user.deletedBy
        return userResponse;
    }
}