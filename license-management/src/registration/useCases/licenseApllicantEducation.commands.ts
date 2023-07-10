/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { LicenseApplicantEducation } from '../domain/licenseApplicantEducation';
export class CreateLicenseApllicantEducationCommand {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  id:string
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId:string
  @ApiProperty()
  @IsNotEmpty()
  Institution: string;
  @ApiProperty()
  @IsNotEmpty()
  fieldOfStudy: string;
  @ApiProperty()
  @IsNotEmpty()
  professionalTitle: string;
  @ApiProperty()
  @IsNotEmpty()
  studentIdNumber: string;
  @ApiProperty()
  @IsNotEmpty()
  receivedDate: string;

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
  static fromCommands(createlicenseApllicantEducationCommand: CreateLicenseApllicantEducationCommand): LicenseApplicantEducation {
    const licenseApplicantEducation: LicenseApplicantEducation = new LicenseApplicantEducation();

    // licenseApplicantEducation.id = createlicenseApllicantEducationCommand?.id;
    licenseApplicantEducation.userId = createlicenseApllicantEducationCommand.userId;
    licenseApplicantEducation.Institution = createlicenseApllicantEducationCommand.Institution;
    licenseApplicantEducation.fieldOfStudy = createlicenseApllicantEducationCommand.fieldOfStudy;
    licenseApplicantEducation.professionalTitle = createlicenseApllicantEducationCommand.professionalTitle;
    licenseApplicantEducation.receivedDate = createlicenseApllicantEducationCommand.receivedDate;
    licenseApplicantEducation.studentIdNumber = createlicenseApllicantEducationCommand.studentIdNumber;

    licenseApplicantEducation.createdAt=createlicenseApllicantEducationCommand.createAt
    licenseApplicantEducation.createdBy=createlicenseApllicantEducationCommand.createdBy
    licenseApplicantEducation.updatedAt=createlicenseApllicantEducationCommand.UpdatedAt
    licenseApplicantEducation.updatedBy=createlicenseApllicantEducationCommand.updatedBy
    licenseApplicantEducation.deletedAt=createlicenseApllicantEducationCommand.deletedAt
    licenseApplicantEducation.deletedBy=createlicenseApllicantEducationCommand.deletedBy
    return licenseApplicantEducation;
  }
}
export class UpdateEducationCommand {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id:string
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId:string
  @ApiProperty()
  @IsNotEmpty()
  Institution: string;
  @ApiProperty()
  @IsNotEmpty()
  fieldOfStudy: string;
  @ApiProperty()
  @IsNotEmpty()
  professionalTitle: string;
  @ApiProperty()
  @IsNotEmpty()
  studentIdNumber: string;
  @ApiProperty()
  @IsNotEmpty()
  receivedDate: string;

  @ApiProperty()
  createAt: Date
  @ApiProperty()
  createdBy: string
  @ApiProperty()
  UpdatedAt: Date
  @ApiProperty()
  updatedBy: string
  // @ApiProperty()
  deletedAt: Date
  // @ApiProperty()
  deletedBy: string
  static fromCommands(updateEducationCommand: UpdateEducationCommand): LicenseApplicantEducation {
    const licenseApplicantEducation: LicenseApplicantEducation = new LicenseApplicantEducation();

    licenseApplicantEducation.id = updateEducationCommand?.id;
    licenseApplicantEducation.userId = updateEducationCommand.userId;
    licenseApplicantEducation.Institution = updateEducationCommand.Institution;
    licenseApplicantEducation.fieldOfStudy = updateEducationCommand.fieldOfStudy;
    licenseApplicantEducation.professionalTitle = updateEducationCommand.professionalTitle;
    licenseApplicantEducation.receivedDate = updateEducationCommand.receivedDate;
    licenseApplicantEducation.studentIdNumber = updateEducationCommand.studentIdNumber;

    licenseApplicantEducation.createdAt=updateEducationCommand.createAt
    licenseApplicantEducation.createdBy=updateEducationCommand.createdBy
    licenseApplicantEducation.updatedAt=updateEducationCommand.UpdatedAt
    licenseApplicantEducation.updatedBy=updateEducationCommand.updatedBy
    licenseApplicantEducation.deletedAt=updateEducationCommand.deletedAt
    licenseApplicantEducation.deletedBy=updateEducationCommand.deletedBy
    return licenseApplicantEducation;
  }
}
