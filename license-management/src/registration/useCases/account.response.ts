/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { LicenseApplicantEducation } from '../domain/licenseApplicantEducation';
import { LicenseApplicantEducationEntity } from '../persistence/education.entity';
import { AccountEntity } from '../persistence/accounts.entity';
import { UserAcount } from '../domain/account';
export class AccountResponse  {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  id:string
  @ApiProperty()
  @IsNotEmpty()
  userName: string
  @ApiProperty()
  @IsNotEmpty()
  status: string
  @ApiProperty()
  @IsNotEmpty()
  Password: string
  @ApiProperty()
  @IsNotEmpty()
  email: string
  @ApiProperty()
  @IsNotEmpty()
  accountType: string

  @ApiProperty()
  createAt: Date
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
  static fromEntity(accountEntity: AccountEntity): AccountResponse {
    console.log('llllllllllllllllllllllllllllll')
    const accountResponse: AccountResponse = new AccountResponse();
    accountResponse.id = accountEntity.id;
    // accountResponse.userId = accountEntity.userId;
    accountResponse.userName = accountEntity.userName;
    accountResponse.status = accountEntity.status;
    accountResponse.Password = accountEntity.password;
    accountResponse.email = accountEntity.email;
    accountResponse.accountType = accountEntity.accountType;
    console.log('llllllllllllllllllllllllllllll')

    accountResponse.createAt=accountEntity.createdAt
    accountResponse.createdBy=accountEntity.createdBy
    accountResponse.updatedAt=accountEntity.updatedAt
    accountResponse.updatedBy=accountEntity.updatedBy
    accountResponse.deletedAt=accountEntity.deletedAt
    accountResponse.deletedBy=accountEntity.deletedBy
    return accountResponse;
  }
  static fromDomain(userAcount: UserAcount): AccountResponse {
    const accountResponse: AccountResponse = new AccountResponse();
    accountResponse.id = userAcount.id;
    // accountResponse.userId = userAcount.userId;
    accountResponse.Password = userAcount.password;
    accountResponse.userName = userAcount.userName;
    accountResponse.status = userAcount.status;
    accountResponse.email = userAcount.email;
    accountResponse.accountType = userAcount.accountType;

    accountResponse.createAt=userAcount.createdAt
    accountResponse.createdBy=userAcount.createdBy
    accountResponse.updatedAt=userAcount.updatedAt
    accountResponse.updatedBy=userAcount.updatedBy
    accountResponse.deletedAt=userAcount.deletedAt
    accountResponse.deletedBy=userAcount.deletedBy
    return accountResponse;
  }
}
