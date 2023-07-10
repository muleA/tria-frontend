/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { LicenseApplication } from '../domain/licenseApplication';
import { User } from '../domain/user';
import { LicenseApplicationEntity } from '../persistence/application.entity';
import { License } from '../domain/License';
import { LicenseResponse } from './License.response';
export class ApplicationResponse {
  // @IsUUID()
  // @IsNotEmpty()
  @ApiProperty()
  id: string;
  @ApiProperty()
  licenseId: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  appointmentDate: Date
  @ApiProperty()
  applicationType: string
  @ApiProperty()
  applicationCategory: string
  @ApiProperty()
  applierType: string
  @ApiProperty()
  // @IsNotEmpty()
  status: string
  @ApiProperty()
  comment: string
  @ApiProperty()
  file: string
  @ApiProperty()
  delegationFile: string
  @ApiProperty()
  educationId: string[]
  @ApiProperty()
  experienceId: string[]
  @ApiProperty()
  certificateId: string[]
  @ApiProperty()
  // @IsNotEmpty()
  license: LicenseResponse

  @ApiProperty()
  state: string
  @ApiProperty()
  subCity: string
  @ApiProperty()
  woreda: string
  @ApiProperty()
  kebele: string
  @ApiProperty()
  houseNumber: string
  @ApiProperty()
  phone: string
  @ApiProperty()
  ownerName: string
  @ApiProperty()
  professionalName: string
  @ApiProperty()
  professionalLastName: string
  @ApiProperty()
  qualificationLevel: string
  @ApiProperty()
  professionalLicenseNumber: string
  @ApiProperty()
  applierProfilePicture: string
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
  static fromEntity(licenseApplicationEntity: LicenseApplicationEntity): ApplicationResponse {
    console.log('licenseApplicationEntity  ', licenseApplicationEntity)
    const applicationResponse: ApplicationResponse = new ApplicationResponse();
    applicationResponse.id = licenseApplicationEntity?.id;
    applicationResponse.licenseId = licenseApplicationEntity?.licenseId
    applicationResponse.userId = licenseApplicationEntity?.userId
    applicationResponse.applicationType = licenseApplicationEntity.applicationType
    applicationResponse.applicationCategory = licenseApplicationEntity.applicationCategory
    applicationResponse.applierType = licenseApplicationEntity.applierType
    applicationResponse.appointmentDate = licenseApplicationEntity.appointmentDate
    applicationResponse.status = licenseApplicationEntity?.status
    applicationResponse.comment = licenseApplicationEntity?.comment
    applicationResponse.file = licenseApplicationEntity?.file
    applicationResponse.delegationFile = licenseApplicationEntity?.delegationFile
    applicationResponse.license = licenseApplicationEntity?.license ? LicenseResponse.fromEntity(licenseApplicationEntity.license) : null
    applicationResponse.educationId = licenseApplicationEntity.educationId
    applicationResponse.experienceId = licenseApplicationEntity.experienceId
    applicationResponse.certificateId = licenseApplicationEntity.certificateId

    applicationResponse.state = licenseApplicationEntity?.state
    applicationResponse.subCity = licenseApplicationEntity?.subCity
    applicationResponse.woreda = licenseApplicationEntity?.woreda
    applicationResponse.kebele = licenseApplicationEntity?.kebele
    applicationResponse.houseNumber = licenseApplicationEntity?.houseNumber
    applicationResponse.phone = licenseApplicationEntity?.phone
    applicationResponse.ownerName = licenseApplicationEntity?.ownerName
    applicationResponse.professionalName = licenseApplicationEntity?.professionalName
    applicationResponse.professionalLastName = licenseApplicationEntity?.professionalLastName
    applicationResponse.applierProfilePicture = licenseApplicationEntity?.applierProfilePicture
    applicationResponse.qualificationLevel = licenseApplicationEntity?.qualificationLevel
    applicationResponse.professionalLicenseNumber = licenseApplicationEntity?.professionalLicenseNumber

    applicationResponse.createdAt = licenseApplicationEntity.createdAt
    applicationResponse.createdBy = licenseApplicationEntity.createdBy
    applicationResponse.updatedAt = licenseApplicationEntity.updatedAt
    applicationResponse.updatedBy = licenseApplicationEntity.updatedBy
    applicationResponse.deletedAt = licenseApplicationEntity.deletedAt
    applicationResponse.deletedBy = licenseApplicationEntity.deletedBy

    return applicationResponse;
  }
  static fromDomain(licenseApplication: LicenseApplication): ApplicationResponse {
    const applicationResponse: ApplicationResponse = new ApplicationResponse();
    applicationResponse.id = licenseApplication?.id;
    applicationResponse.licenseId = licenseApplication?.licenseId
    applicationResponse.userId = licenseApplication?.userId
    applicationResponse.applicationType = licenseApplication?.applicationType
    applicationResponse.applicationCategory = licenseApplication?.applicationCategory
    applicationResponse.applierType = licenseApplication?.applierType
    applicationResponse.appointmentDate = licenseApplication?.appointmentDate
    applicationResponse.status = licenseApplication?.status
    applicationResponse.comment = licenseApplication?.comment
    applicationResponse.file = licenseApplication?.file
    applicationResponse.delegationFile = licenseApplication?.delegationFile
    applicationResponse.educationId = licenseApplication?.educationId
    applicationResponse.experienceId = licenseApplication?.experienceId
    applicationResponse.certificateId = licenseApplication?.certificateId
    applicationResponse.license = licenseApplication.license ? LicenseResponse.fromDomain(licenseApplication.license) : null

    applicationResponse.state = licenseApplication?.state
    applicationResponse.subCity = licenseApplication?.subCity
    applicationResponse.woreda = licenseApplication?.woreda
    applicationResponse.kebele = licenseApplication?.kebele
    applicationResponse.houseNumber = licenseApplication?.houseNumber
    applicationResponse.phone = licenseApplication?.phone
    applicationResponse.ownerName = licenseApplication?.ownerName
    applicationResponse.professionalName = licenseApplication?.professionalName
    applicationResponse.professionalLastName = licenseApplication?.professionalLastName
    applicationResponse.qualificationLevel = licenseApplication?.qualificationLevel
    applicationResponse.professionalLicenseNumber = licenseApplication?.professionalLicenseNumber

    applicationResponse.createdAt = licenseApplication.createdAt
    applicationResponse.createdBy = licenseApplication.createdBy
    applicationResponse.updatedAt = licenseApplication.updatedAt
    applicationResponse.updatedBy = licenseApplication.updatedBy
    applicationResponse.deletedAt = licenseApplication.deletedAt
    applicationResponse.deletedBy = licenseApplication.deletedBy
    return applicationResponse;
  }
}