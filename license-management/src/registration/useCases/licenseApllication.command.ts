/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { LicenseApplication } from '../domain/licenseApplication';
import { User } from '../domain/user';
import { License } from '../domain/License';
export class CreateLicenseApllicationCommand {
  // @IsUUID()
  // @IsNotEmpty()
  // @ApiProperty()
  id: string;
  // @ApiProperty()
  licenseId:string
  @ApiProperty()
  @IsNotEmpty()
  applierType: string
  @ApiProperty()
  @IsNotEmpty()
  applicationType: string
  @ApiProperty()
  @IsNotEmpty()
  appointmentDate: Date
  
  
  // @ApiProperty()
  // @IsNotEmpty()
  license: License


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
  static fromCommands(createLicenseApllicationCommand: CreateLicenseApllicationCommand): LicenseApplication {
    const licenseApplication: LicenseApplication = new LicenseApplication();
    licenseApplication.id = createLicenseApllicationCommand.id;
    licenseApplication.licenseId = createLicenseApllicationCommand.licenseId
    licenseApplication.applicationType = createLicenseApllicationCommand.applicationType
    licenseApplication.applierType = createLicenseApllicationCommand.applierType
    licenseApplication.appointmentDate = createLicenseApllicationCommand.appointmentDate

    licenseApplication.createdAt=createLicenseApllicationCommand.createAt
    licenseApplication.createdBy=createLicenseApllicationCommand.createdBy
    licenseApplication.updatedAt=createLicenseApllicationCommand.UpdatedAt
    licenseApplication.updatedBy=createLicenseApllicationCommand.updatedBy
    licenseApplication.deletedAt=createLicenseApllicationCommand.deletedAt
    licenseApplication.deletedBy=createLicenseApllicationCommand.deletedBy
    return licenseApplication;
  }
}
