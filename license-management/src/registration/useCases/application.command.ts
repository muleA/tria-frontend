/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, isUUID } from 'class-validator';
import { LicenseApplication } from '../domain/licenseApplication';
import { User } from '../domain/user';
import { LicenseApplicationEntity } from '../persistence/application.entity';
import { License } from '../domain/License';
export class CreateApplicationCommand {
  // @IsUUID()
  // @IsNotEmpty()
  // @ApiProperty()
  id: string;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  licenseId: string
  // @ApiProperty()
  aappointmentDate: Date
  @ApiProperty()
  applicationType: string
  @ApiProperty()
  applicationCategory: string
  @ApiProperty()
  applierType: string
  // @ApiProperty()
  // @IsNotEmpty()
  status: string
  // @ApiProperty()
  // @IsNotEmpty()
  comment: string
  // @ApiProperty()
  // @IsNotEmpty()
  file: string
  @ApiProperty()
  delegationFile: string
  // @ApiProperty()
  license: License
  @ApiProperty()
  @IsNotEmpty()
  educationId: string[]
  @ApiProperty()
  @IsNotEmpty()
  experienceIdId: string[]
  @ApiProperty()
  certificateId: string[]
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
  static fromCommand(createApplicationCommand: CreateApplicationCommand): LicenseApplication {
    const licenseApplication: LicenseApplication = new LicenseApplication();
    licenseApplication.id = createApplicationCommand.id;
    licenseApplication.licenseId = createApplicationCommand.licenseId
    licenseApplication.applicationType = createApplicationCommand.applicationType
    licenseApplication.applicationCategory = createApplicationCommand.applicationCategory
    licenseApplication.applierType = createApplicationCommand.applierType
    licenseApplication.status = createApplicationCommand.status
    licenseApplication.educationId = createApplicationCommand.educationId
    licenseApplication.experienceId = createApplicationCommand.experienceIdId
    licenseApplication.certificateId = createApplicationCommand.certificateId
    licenseApplication.file = createApplicationCommand.file
    licenseApplication.delegationFile = createApplicationCommand.delegationFile
    licenseApplication.comment = createApplicationCommand.comment

    licenseApplication.createdAt = createApplicationCommand.createdAt
    licenseApplication.createdBy = createApplicationCommand.createdBy
    licenseApplication.updatedAt = createApplicationCommand.updatedAt
    licenseApplication.updatedBy = createApplicationCommand.updatedBy
    licenseApplication.deletedAt = createApplicationCommand.deletedAt
    licenseApplication.deletedBy = createApplicationCommand.deletedBy
    return licenseApplication;
  }
  //   static fromDomain(licenseApplication: LicenseApplication): ApplicationResponse {
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
export class UpdateApplicationCommand {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  licenseId: string
  // @ApiProperty()
  aappointmentDate: Date
  @ApiProperty()
  applicationType: string
  @ApiProperty()
  applicationCategory: string
  @ApiProperty()
  applierType: string
  // @ApiProperty()
  // @IsNotEmpty()
  status: string
  // @ApiProperty()
  // @IsNotEmpty()
  comment: string
  // @ApiProperty()
  // @IsNotEmpty()
  file: string
  delegationFile: string
  // @ApiProperty()
  license: License
  @ApiProperty()
  @IsNotEmpty()
  educationId: string[]
  @ApiProperty()
  @IsNotEmpty()
  experienceId: string[]
  @ApiProperty()
  certificateId: string[]
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
  static fromCommand(createApplicationCommand: UpdateApplicationCommand): LicenseApplication {
    const licenseApplication: LicenseApplication = new LicenseApplication();
    licenseApplication.id = createApplicationCommand.id;
    licenseApplication.licenseId = createApplicationCommand.licenseId
    licenseApplication.applicationType = createApplicationCommand.applicationType
    licenseApplication.applicationCategory = createApplicationCommand.applicationCategory
    licenseApplication.applierType = createApplicationCommand.applierType
    licenseApplication.status = createApplicationCommand.status
    licenseApplication.educationId = createApplicationCommand.educationId
    licenseApplication.experienceId = createApplicationCommand.experienceId
    licenseApplication.certificateId = createApplicationCommand.certificateId
    licenseApplication.file = createApplicationCommand.file
    licenseApplication.delegationFile = createApplicationCommand.delegationFile
    licenseApplication.comment = createApplicationCommand.comment

    licenseApplication.createdAt = createApplicationCommand.createdAt
    licenseApplication.createdBy = createApplicationCommand.createdBy
    licenseApplication.updatedAt = createApplicationCommand.updatedAt
    licenseApplication.updatedBy = createApplicationCommand.updatedBy
    licenseApplication.deletedAt = createApplicationCommand.deletedAt
    licenseApplication.deletedBy = createApplicationCommand.deletedBy
    return licenseApplication;
  }
  //   static fromDomain(licenseApplication: LicenseApplication): ApplicationResponse {
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
export class ChangeApplicationStatusCommand{
  @ApiProperty()
  @IsNotEmpty()
  status:string

  @ApiProperty()
  comment:string
}
export class GiveAppointmentCommand{
  @ApiProperty()
  @IsNotEmpty()
  startDtae:Date

  @ApiProperty()
  // @IsNotEmpty()
  endDate:Date
}