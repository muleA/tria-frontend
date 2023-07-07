/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { LicenseApplication } from '../domain/licenseApplication';
import { User } from '../domain/user';
import { License } from '../domain/License';
import { UserEntity } from '../persistence/user.entity';
import { LicenseApplicationEntity } from '../persistence/application.entity';
import { LicenseResponse } from './License.response';
import { LicenseEntity } from '../persistence/License.entity';
export class CreateLicenseCommand {
  // @IsUUID()
  // @IsNotEmpty()
  // @ApiProperty()
  id: string;
  licenseNumber: string;
  issuedBy: string;
  @ApiProperty()
  validFrom:Date
  @ApiProperty()
  applicationId:string
  @ApiProperty()
  validTo:Date
  @ApiProperty()
  userId:string
  // @ApiProperty()
  // @IsNotEmpty()
  status: string
  comment: string
  // @ApiProperty()
  // @IsNotEmpty()
  user: UserEntity
  application:LicenseApplicationEntity

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
  static fromCommands(createLicenseCommand: CreateLicenseCommand): License {
    const license: License = new License();
    license.id = createLicenseCommand?.id;
    license.licenseNumber = createLicenseCommand?.licenseNumber;
    license.issuedBy = createLicenseCommand?.issuedBy;
    license.applicationId = createLicenseCommand?.applicationId;
    license.validFrom = createLicenseCommand?.validFrom
    license.validTo = createLicenseCommand?.validTo
    license.userId = createLicenseCommand?.userId
    license.status = createLicenseCommand?.status
    license.comment = createLicenseCommand?.comment

    license.createdAt=createLicenseCommand.createAt
    license.createdBy=createLicenseCommand.createdBy
    license.updatedAt=createLicenseCommand.UpdatedAt
    license.updatedBy=createLicenseCommand.updatedBy
    license.deletedAt=createLicenseCommand.deletedAt
    license.deletedBy=createLicenseCommand.deletedBy
    return license;
  }
  static fromEntities(license: License): LicenseEntity {
    const licenseEntity: LicenseEntity = new LicenseEntity();
    licenseEntity.id = license.id;
    licenseEntity.licenseNumber = license?.licenseNumber;
    licenseEntity.issuedBy = license?.issuedBy;
    licenseEntity.validFrom = license?.validFrom;
    licenseEntity.validTo = license?.validTo;
    licenseEntity.userId = license?.userId;
    licenseEntity.status = license?.status;
    licenseEntity.comment = license?.comment;
    licenseEntity.applicationId = license?.applicationId;
  
    licenseEntity.createdAt = license.createdAt
    licenseEntity.createdBy = license.createdBy
    licenseEntity.updatedAt = license.updatedAt
    licenseEntity.updatedBy = license.updatedBy
    licenseEntity.deletedAt = license.deletedAt
    licenseEntity.deletedBy = license.deletedBy
    return licenseEntity;
}
}
export class UpdateLicenseCommand {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
  @ApiProperty()
  validFrom:Date
  @ApiProperty()
  applicationId:string
  @ApiProperty()
  validTo:Date
  @ApiProperty()
  userId:string
  @ApiProperty()
  @IsNotEmpty()
  status: string
  comment: string
  // @ApiProperty()
  // @IsNotEmpty()
  user: UserEntity
  // @ApiProperty()
  // @IsNotEmpty()
  application:LicenseApplicationEntity

  // @ApiProperty()
  createAt: Date
  // @ApiProperty()
  createdBy: string
  @ApiProperty()
  UpdatedAt: Date
  // @ApiProperty()
  updatedBy: string
  // @ApiProperty()
  deletedAt: Date
  // @ApiProperty()
  deletedBy: string
  static fromCommands(updateLicenseCommand: UpdateLicenseCommand): License {
    const license: License = new License();
    license.id = updateLicenseCommand.id;
    license.applicationId = updateLicenseCommand.applicationId;
    license.validFrom = updateLicenseCommand.validFrom
    license.validTo = updateLicenseCommand.validTo
    license.userId = updateLicenseCommand.userId
    license.status = updateLicenseCommand.status
    license.comment = updateLicenseCommand.comment

    license.createdAt=updateLicenseCommand.createAt
    license.createdBy=updateLicenseCommand.createdBy
    license.updatedAt=updateLicenseCommand.UpdatedAt
    license.updatedBy=updateLicenseCommand.updatedBy
    license.deletedAt=updateLicenseCommand.deletedAt
    license.deletedBy=updateLicenseCommand.deletedBy
    return license;
  }
//   static fromEntities(license: License): LicenseEntity {
//     const licenseEntity: LicenseEntity = new LicenseEntity();
//     licenseEntity.id = license.id;
//     licenseEntity.validFrom = license.validFrom;
//     licenseEntity.validTo = license.validTo;
//     licenseEntity.userId = license.userId;
//     licenseEntity.status = license.status;
//     licenseEntity.comment = license.comment;
//     licenseEntity.applicationId = license.applicationId;
  
//     licenseEntity.createdAt = license.createdAt
//     licenseEntity.createdBy = license.createdBy
//     licenseEntity.updatedAt = license.updatedAt
//     licenseEntity.updatedBy = license.updatedBy
//     licenseEntity.deletedAt = license.deletedAt
//     licenseEntity.deletedBy = license.deletedBy
//     return licenseEntity;
// }
}
