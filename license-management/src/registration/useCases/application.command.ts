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
  @ApiProperty()
  userId: string
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
  ownerName: string
  @ApiProperty()
  lastNameName: string

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
    licenseApplication.id = createApplicationCommand?.id;
    licenseApplication.userId = createApplicationCommand?.userId;
    licenseApplication.licenseId = createApplicationCommand?.licenseId
    licenseApplication.applicationType = createApplicationCommand?.applicationType
    licenseApplication.applicationCategory = createApplicationCommand?.applicationCategory
    licenseApplication.applierType = createApplicationCommand?.applierType
    licenseApplication.status = createApplicationCommand?.status
    licenseApplication.educationId = createApplicationCommand?.educationId
    licenseApplication.experienceId = createApplicationCommand?.experienceIdId
    licenseApplication.certificateId = createApplicationCommand?.certificateId
    licenseApplication.file = createApplicationCommand?.file
    licenseApplication.delegationFile = createApplicationCommand?.delegationFile
    licenseApplication.comment = createApplicationCommand?.comment
    licenseApplication.ownerName = createApplicationCommand?.ownerName
    licenseApplication.ownerName = createApplicationCommand?.ownerName
    licenseApplication.lastName = createApplicationCommand?.lastNameName

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
export class CreateHealthFacilityApplicationCommand {
  // @IsUUID()
  // @IsNotEmpty()
  // @ApiProperty()
  id: string;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  @ApiProperty()
  userId:string
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
  @ApiProperty()
  applierProfilePicture: string
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
  facilityName: string
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
  lastName: string
  @ApiProperty()
  professionalName: string
  @ApiProperty()
  professionalLastName: string
  @ApiProperty()
  qualificationLevel: string
  @ApiProperty()
  professionalLicenseNumber: string

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
  static fromCommand(createApplicationCommand: CreateHealthFacilityApplicationCommand): LicenseApplication {
    const licenseApplication: LicenseApplication = new LicenseApplication();
    licenseApplication.id = createApplicationCommand.id;
    licenseApplication.userId = createApplicationCommand?.userId;
    licenseApplication.licenseId = createApplicationCommand?.licenseId
    licenseApplication.applicationType = createApplicationCommand?.applicationType
    licenseApplication.applicationCategory = createApplicationCommand?.applicationCategory
    licenseApplication.applierType = createApplicationCommand?.applierType
    licenseApplication.status = createApplicationCommand?.status
    licenseApplication.educationId = createApplicationCommand?.educationId
    licenseApplication.experienceId = createApplicationCommand?.experienceId
    licenseApplication.certificateId = createApplicationCommand?.certificateId
    licenseApplication.file = createApplicationCommand?.file
    licenseApplication.delegationFile = createApplicationCommand?.delegationFile
    licenseApplication.comment = createApplicationCommand?.comment

    licenseApplication.facilityName = createApplicationCommand?.facilityName
    licenseApplication.state = createApplicationCommand?.state
    licenseApplication.subCity = createApplicationCommand?.subCity
    licenseApplication.woreda = createApplicationCommand?.woreda
    licenseApplication.kebele = createApplicationCommand?.kebele
    licenseApplication.houseNumber = createApplicationCommand?.houseNumber
    licenseApplication.phone = createApplicationCommand?.phone
    licenseApplication.ownerName = createApplicationCommand?.ownerName
    licenseApplication.lastName = createApplicationCommand?.lastName
    licenseApplication.professionalName = createApplicationCommand?.professionalName
    licenseApplication.professionalLastName = createApplicationCommand?.professionalLastName
    licenseApplication.applierProfilePicture = createApplicationCommand?.applierProfilePicture
    licenseApplication.qualificationLevel = createApplicationCommand?.qualificationLevel
    licenseApplication.professionalLicenseNumber = createApplicationCommand?.professionalLicenseNumber

    licenseApplication.createdAt = createApplicationCommand.createdAt
    licenseApplication.createdBy = createApplicationCommand.createdBy
    licenseApplication.updatedAt = createApplicationCommand.updatedAt
    licenseApplication.updatedBy = createApplicationCommand.updatedBy
    licenseApplication.deletedAt = createApplicationCommand.deletedAt
    licenseApplication.deletedBy = createApplicationCommand.deletedBy
    return licenseApplication;
  }
  static fromDomain(createApplicationCommand: LicenseApplication): LicenseApplicationEntity {
    const licenseApplication: LicenseApplicationEntity = new LicenseApplicationEntity();
    licenseApplication.id = createApplicationCommand.id;
    licenseApplication.userId = createApplicationCommand?.userId;
    licenseApplication.licenseId = createApplicationCommand?.licenseId
    licenseApplication.applicationType = createApplicationCommand?.applicationType
    licenseApplication.applicationCategory = createApplicationCommand?.applicationCategory
    licenseApplication.applierType = createApplicationCommand?.applierType
    licenseApplication.status = createApplicationCommand?.status
    licenseApplication.educationId = createApplicationCommand?.educationId
    licenseApplication.experienceId = createApplicationCommand?.experienceId
    licenseApplication.certificateId = createApplicationCommand?.certificateId
    licenseApplication.file = createApplicationCommand?.file
    licenseApplication.delegationFile = createApplicationCommand?.delegationFile
    licenseApplication.comment = createApplicationCommand?.comment

    licenseApplication.facilityName = createApplicationCommand?.facilityName
    licenseApplication.state = createApplicationCommand?.state
    licenseApplication.subCity = createApplicationCommand?.subCity
    licenseApplication.woreda = createApplicationCommand?.woreda
    licenseApplication.kebele = createApplicationCommand?.kebele
    licenseApplication.houseNumber = createApplicationCommand?.houseNumber
    licenseApplication.phone = createApplicationCommand?.phone
    licenseApplication.ownerName = createApplicationCommand?.ownerName
    licenseApplication.lastName = createApplicationCommand?.lastName
    licenseApplication.professionalName = createApplicationCommand?.professionalName
    licenseApplication.professionalLastName = createApplicationCommand?.professionalLastName
    licenseApplication.applierProfilePicture = createApplicationCommand?.applierProfilePicture
    licenseApplication.qualificationLevel = createApplicationCommand?.qualificationLevel
    licenseApplication.professionalLicenseNumber = createApplicationCommand?.professionalLicenseNumber

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
export class UpdateHealthFacilityApplicationCommand {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  @ApiProperty()
  userId:string
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
  @ApiProperty()
  applierProfilePicture: string
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
  facilityName: string
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
  lastName: string
  @ApiProperty()
  professionalName: string
  @ApiProperty()
  professionalLastName: string
  @ApiProperty()
  qualificationLevel: string
  @ApiProperty()
  professionalLicenseNumber: string

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
  static fromCommand(createApplicationCommand: CreateHealthFacilityApplicationCommand): LicenseApplication {
    const licenseApplication: LicenseApplication = new LicenseApplication();
    licenseApplication.id = createApplicationCommand.id;
    licenseApplication.userId = createApplicationCommand?.userId;
    licenseApplication.licenseId = createApplicationCommand?.licenseId
    licenseApplication.applicationType = createApplicationCommand?.applicationType
    licenseApplication.applicationCategory = createApplicationCommand?.applicationCategory
    licenseApplication.applierType = createApplicationCommand?.applierType
    licenseApplication.status = createApplicationCommand?.status
    licenseApplication.educationId = createApplicationCommand?.educationId
    licenseApplication.experienceId = createApplicationCommand?.experienceId
    licenseApplication.certificateId = createApplicationCommand?.certificateId
    licenseApplication.file = createApplicationCommand?.file
    licenseApplication.delegationFile = createApplicationCommand?.delegationFile
    licenseApplication.comment = createApplicationCommand?.comment

    licenseApplication.facilityName = createApplicationCommand?.facilityName
    licenseApplication.state = createApplicationCommand?.state
    licenseApplication.subCity = createApplicationCommand?.subCity
    licenseApplication.woreda = createApplicationCommand?.woreda
    licenseApplication.kebele = createApplicationCommand?.kebele
    licenseApplication.houseNumber = createApplicationCommand?.houseNumber
    licenseApplication.phone = createApplicationCommand?.phone
    licenseApplication.ownerName = createApplicationCommand?.ownerName
    licenseApplication.lastName = createApplicationCommand?.lastName
    licenseApplication.professionalName = createApplicationCommand?.professionalName
    licenseApplication.professionalLastName = createApplicationCommand?.professionalLastName
    licenseApplication.applierProfilePicture = createApplicationCommand?.applierProfilePicture
    licenseApplication.qualificationLevel = createApplicationCommand?.qualificationLevel
    licenseApplication.professionalLicenseNumber = createApplicationCommand?.professionalLicenseNumber

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

  @ApiProperty()
  id: string;
  @ApiProperty()
  licenseId: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  appointmentDate: Date;
  @ApiProperty()
  applicationType: string
  @ApiProperty()
  applicationCategory: string
  @ApiProperty()
  applierType: string
  @ApiProperty()
  file: string

  @ApiProperty()
  facilityName: string
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
  lastName: string
  @ApiProperty()
  professionalName: string
  @ApiProperty()
  professionalLastName: string
  @ApiProperty()
  qualificationLevel: string
  @ApiProperty()
  applierProfilePicture: string
  @ApiProperty()
  professionalLicenseNumber: string

  @ApiProperty()
  delegationFile: string

  @ApiProperty()
  comment: string
  //   appliaction statuse can be DRAFT,AJUST,SUBMITTED,ARCHIVED
  status: string
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
    licenseApplication.licenseId = createApplicationCommand?.licenseId
    licenseApplication.userId = createApplicationCommand?.userId
    licenseApplication.appointmentDate = createApplicationCommand?.appointmentDate
    licenseApplication.applicationCategory = createApplicationCommand?.applicationCategory
    licenseApplication.applierType = createApplicationCommand?.applierType
    licenseApplication.file = createApplicationCommand?.file
    licenseApplication.applicationType = createApplicationCommand?.applicationType
    licenseApplication.facilityName = createApplicationCommand?.facilityName
    licenseApplication.state = createApplicationCommand?.state
    licenseApplication.subCity = createApplicationCommand?.subCity
    licenseApplication.woreda = createApplicationCommand?.woreda
    licenseApplication.kebele = createApplicationCommand?.kebele
    licenseApplication.houseNumber = createApplicationCommand?.houseNumber
    licenseApplication.phone = createApplicationCommand?.phone
    licenseApplication.ownerName = createApplicationCommand?.ownerName
    licenseApplication.lastName = createApplicationCommand?.lastName
    licenseApplication.professionalName = createApplicationCommand?.professionalName
    licenseApplication.professionalLastName = createApplicationCommand?.professionalLastName
    licenseApplication.qualificationLevel = createApplicationCommand?.qualificationLevel
    licenseApplication.professionalLicenseNumber = createApplicationCommand?.professionalLicenseNumber
    licenseApplication.delegationFile = createApplicationCommand?.delegationFile
    licenseApplication.applierProfilePicture = createApplicationCommand?.applierProfilePicture

    licenseApplication.status = createApplicationCommand?.status
    licenseApplication.educationId = createApplicationCommand?.educationId
    licenseApplication.experienceId = createApplicationCommand?.experienceId
    licenseApplication.certificateId = createApplicationCommand?.certificateId

    licenseApplication.comment = createApplicationCommand?.comment

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
export class ChangeApplicationStatusCommand {
  @ApiProperty()
  @IsNotEmpty()
  status: string

  @ApiProperty()
  comment: string
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  issuedBy: string
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  email: string
  @ApiProperty()
  facilityName: string
  @ApiProperty()
  userId: string
  @ApiProperty()
  validFrom: Date

  @ApiProperty()
  validTo: Date
  @ApiProperty()
  createdAt: Date
}
export class GiveAppointmentCommand {
  @ApiProperty()
  @IsNotEmpty()
  startDtae: Date

  @ApiProperty()
  // @IsNotEmpty()
  endDate: Date

}