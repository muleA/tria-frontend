/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { LicenseApplicantExperience } from '../domain/licenseApplicantExperience';
export class CreateLicenseApplicantExperienceCommand {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  id: string
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string
  @ApiProperty()
  @IsNotEmpty()
  tin: string
  @ApiProperty()
  @IsNotEmpty()
  organizationName: string
  @ApiProperty()
  @IsNotEmpty()
  subCity: string
  @ApiProperty()
  @IsNotEmpty()
  woreda: string
  @ApiProperty()
  kebela: string
  // @ApiProperty()
  file:string

  @ApiProperty()
  createAt: Date
  @ApiProperty()
  UpdatedAt: Date
  // @ApiProperty()
  createdBy: string
  
  // @ApiProperty()
  updatedBy: string
  // @ApiProperty()
  deletedAt: Date
  // @ApiProperty()
  deletedBy: string
  static fromCommands(licenseApplicantExperienceCommand: CreateLicenseApplicantExperienceCommand): LicenseApplicantExperience {
    const licenseApplicantExperience: LicenseApplicantExperience = new LicenseApplicantExperience();
    licenseApplicantExperience.id = licenseApplicantExperienceCommand.id;
    licenseApplicantExperience.tin = licenseApplicantExperienceCommand.tin;
    licenseApplicantExperience.userId = licenseApplicantExperienceCommand.userId;
    licenseApplicantExperience.kebela = licenseApplicantExperienceCommand.kebela;
    licenseApplicantExperience.organizationName = licenseApplicantExperienceCommand.organizationName;
    licenseApplicantExperience.woreda = licenseApplicantExperienceCommand.woreda;
    licenseApplicantExperience.subCity = licenseApplicantExperienceCommand.subCity;
    licenseApplicantExperience.file = licenseApplicantExperienceCommand?.file;


    licenseApplicantExperience.createdAt = licenseApplicantExperienceCommand.createAt
    licenseApplicantExperience.createdBy = licenseApplicantExperienceCommand.createdBy
    licenseApplicantExperience.updatedAt = licenseApplicantExperienceCommand.UpdatedAt
    licenseApplicantExperience.updatedBy = licenseApplicantExperienceCommand.updatedBy
    licenseApplicantExperience.deletedAt = licenseApplicantExperienceCommand.deletedAt
    licenseApplicantExperience.deletedBy = licenseApplicantExperienceCommand.deletedBy
    return licenseApplicantExperience;
  }
}
export class UpdateExperienceCommand {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string
  @ApiProperty()
  @IsNotEmpty()
  tin: string
  @ApiProperty()
  @IsNotEmpty()
  organizationName: string
  @ApiProperty()
  @IsNotEmpty()
  subCity: string
  @ApiProperty()
  @IsNotEmpty()
  woreda: string
  @ApiProperty()
  kebela: string
  @ApiProperty()
  file:string

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
  static fromCommands(licenseApplicantExperienceCommand: UpdateExperienceCommand): LicenseApplicantExperience {
    const licenseApplicantExperience: LicenseApplicantExperience = new LicenseApplicantExperience();
    licenseApplicantExperience.id = licenseApplicantExperienceCommand.id;
    licenseApplicantExperience.tin = licenseApplicantExperienceCommand.tin;
    licenseApplicantExperience.userId = licenseApplicantExperienceCommand.userId;
    licenseApplicantExperience.kebela = licenseApplicantExperienceCommand.kebela;
    licenseApplicantExperience.organizationName = licenseApplicantExperienceCommand.organizationName;
    licenseApplicantExperience.woreda = licenseApplicantExperienceCommand.woreda;
    licenseApplicantExperience.subCity = licenseApplicantExperienceCommand.subCity;
    licenseApplicantExperience.file = licenseApplicantExperienceCommand?.file;


    licenseApplicantExperience.createdAt = licenseApplicantExperienceCommand.createAt
    licenseApplicantExperience.createdBy = licenseApplicantExperienceCommand.createdBy
    licenseApplicantExperience.updatedAt = licenseApplicantExperienceCommand.UpdatedAt
    licenseApplicantExperience.updatedBy = licenseApplicantExperienceCommand.updatedBy
    licenseApplicantExperience.deletedAt = licenseApplicantExperienceCommand.deletedAt
    licenseApplicantExperience.deletedBy = licenseApplicantExperienceCommand.deletedBy
    return licenseApplicantExperience;
  }
}