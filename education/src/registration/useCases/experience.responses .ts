/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { LicenseApplicantExperience } from '../domain/licenseApplicantExperience';
import { LicenseApplicantexperienceEntity } from '../persistence/experience.entity';
export class ExperienceResponses  {
  @ApiProperty()
  id:string
  @ApiProperty()
  userId:string
  @ApiProperty()
  tin: string
  @ApiProperty()
  organizationName: string
  @ApiProperty()
  subCity: string
  @ApiProperty()
  woreda: string
  @ApiProperty()
  kebela: string
  @ApiProperty()
  file:string

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
  static fromEntity(licenseApplicantexperienceEntity: LicenseApplicantexperienceEntity): ExperienceResponses {
    const experienceResponses: ExperienceResponses = new ExperienceResponses();

    experienceResponses.id = licenseApplicantexperienceEntity?.id;
    experienceResponses.userId = licenseApplicantexperienceEntity?.userId;
    experienceResponses.tin = licenseApplicantexperienceEntity?.tin;
    experienceResponses.kebela = licenseApplicantexperienceEntity?.kebela;
    experienceResponses.organizationName = licenseApplicantexperienceEntity?.organizationName;
    experienceResponses.woreda = licenseApplicantexperienceEntity?.woreda;
    experienceResponses.subCity = licenseApplicantexperienceEntity?.subCity;
    experienceResponses.file = licenseApplicantexperienceEntity?.file;


    experienceResponses.createdAt=licenseApplicantexperienceEntity?.createdAt
    experienceResponses.createdBy=licenseApplicantexperienceEntity?.createdBy
    experienceResponses.updatedAt=licenseApplicantexperienceEntity?.updatedAt
    experienceResponses.updatedBy=licenseApplicantexperienceEntity?.updatedBy
    experienceResponses.deletedAt=licenseApplicantexperienceEntity?.deletedAt
    experienceResponses.deletedBy=licenseApplicantexperienceEntity?.deletedBy
    return experienceResponses;
  }
  static fromDomain(licenseApplicantExperience: LicenseApplicantExperience): ExperienceResponses {
    const experienceResponses: ExperienceResponses = new ExperienceResponses();
    experienceResponses.id = licenseApplicantExperience.id;
    experienceResponses.userId = licenseApplicantExperience.userId;
    experienceResponses.tin = licenseApplicantExperience.tin;
    experienceResponses.kebela = licenseApplicantExperience.kebela;
    experienceResponses.organizationName = licenseApplicantExperience.organizationName;
    experienceResponses.woreda = licenseApplicantExperience.woreda;
    experienceResponses.subCity = licenseApplicantExperience.subCity;
    experienceResponses.file = licenseApplicantExperience?.file;



    experienceResponses.createdAt=licenseApplicantExperience.createdAt
    experienceResponses.createdBy=licenseApplicantExperience.createdBy
    experienceResponses.updatedAt=licenseApplicantExperience.updatedAt
    experienceResponses.updatedBy=licenseApplicantExperience.updatedBy
    experienceResponses.deletedAt=licenseApplicantExperience.deletedAt
    experienceResponses.deletedBy=licenseApplicantExperience.deletedBy
    return experienceResponses;
  }
}