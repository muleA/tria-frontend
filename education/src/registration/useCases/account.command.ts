/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import {  UserAcount } from '../domain/account';
import * as bcrypt from 'bcrypt'
export class CreateAccountCommand {
  // @IsUUID()
  // @IsNotEmpty()
//   @ApiProperty()
  id: string;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  userID: string
  @ApiProperty()
  @IsNotEmpty()
  userName: string
  @ApiProperty()
  // @IsNotEmpty()
  status: string
  @ApiProperty()
  @IsNotEmpty()
  phone: string
  @ApiProperty()
  @IsNotEmpty()
  Password: string
  @ApiProperty()
  @IsNotEmpty()
  email: string
  // @ApiProperty()
  // @IsNotEmpty()
  accountType: string
  @ApiProperty()
  createdAt: Date
  // @ApiProperty()
  createdBy: string
  // @ApiProperty()
  updatedAt: Date
  // @ApiProperty()
  updatedBy: string
  // @ApiProperty()
  deletedAt: Date
  // @ApiProperty()
  deletedBy: string
   static fromCommands(CreateAccountCommand: CreateAccountCommand): UserAcount {
    const userAcount: UserAcount = new UserAcount();
    userAcount.id = CreateAccountCommand.id;
    // userAcount.userId = CreateAccountCommand.userID
    userAcount.userName = CreateAccountCommand.userName
    userAcount.email = CreateAccountCommand.email
    userAcount.status = CreateAccountCommand.status
    userAcount.accountType = CreateAccountCommand.accountType
    userAcount.password = CreateAccountCommand.Password
    userAcount.createdAt=CreateAccountCommand.createdAt
    userAcount.createdBy=CreateAccountCommand.createdBy
    userAcount.updatedAt=CreateAccountCommand.updatedAt
    userAcount.updatedBy=CreateAccountCommand.updatedBy
    userAcount.deletedAt=CreateAccountCommand.deletedAt
    userAcount.deletedBy=CreateAccountCommand.deletedBy
    return userAcount;
  }
//   static fromDomain(userAcount: userAcount): ApplicationResponse {
//     const applicationResponse: ApplicationResponse = new ApplicationResponse();
//     applicationResponse.id = licenseApplication.id;
//     applicationResponse.id = licenseApplication.id
//     applicationResponse.status = licenseApplication.status
//     applicationResponse.type = licenseApplication.type

//     applicationResponse.createdAt=licenseApplication.createdAt
//     applicationResponse.createdBy=licenseApplication.createdBy
//     applicationResponse.updatedAt=licenseApplication.updatedAt
//     applicationResponse.updatedBy=licenseApplication.updatedBy
//     applicationResponse.deletedAt=licenseApplication.deletedAt
//     applicationResponse.deletedBy=licenseApplication.deletedBy
//     return applicationResponse;
//   }
}
export class UpdateAccountCommand {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    id: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    userId: string
    @ApiProperty()
    @IsNotEmpty()
    userName: string
    @ApiProperty()
    @IsNotEmpty()
    status: string
    @ApiProperty()
    @IsNotEmpty()
    accountType: string
    @ApiProperty()
    @IsNotEmpty()
    Password: string
    @ApiProperty()
    @IsNotEmpty()
    email: string
  
    @ApiProperty()
    createdAt: Date
    // @ApiProperty()
    createdBy: string
    // @ApiProperty()
    updatedAt: Date
    // @ApiProperty()
    updatedBy: string
    // @ApiProperty()
    deletedAt: Date
    // @ApiProperty()
    deletedBy: string
    static fromCommands(CreateAccountCommand: UpdateAccountCommand): UserAcount {
      const userAcount: UserAcount = new UserAcount();
      userAcount.id = CreateAccountCommand.id;
      // userAcount.userId = CreateAccountCommand.userId
      userAcount.userName= CreateAccountCommand.userName
      userAcount.status= CreateAccountCommand.status
      userAcount.password = CreateAccountCommand.Password
      userAcount.email = CreateAccountCommand.email
      userAcount.accountType = CreateAccountCommand.accountType
      
  
      userAcount.createdAt=CreateAccountCommand.createdAt
      userAcount.createdBy=CreateAccountCommand.createdBy
      userAcount.updatedAt=CreateAccountCommand.updatedAt
      userAcount.updatedBy=CreateAccountCommand.updatedBy
      userAcount.deletedAt=CreateAccountCommand.deletedAt
      userAcount.deletedBy=CreateAccountCommand.deletedBy
      return userAcount;
    }
 
  }
