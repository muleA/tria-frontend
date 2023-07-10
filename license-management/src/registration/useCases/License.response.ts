/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { LicenseApplicantEducation } from '../domain/licenseApplicantEducation';
import { LicenseApplicantEducationEntity } from '../persistence/education.entity';
import { LicenseEntity } from '../persistence/License.entity';
import { License } from '../domain/License';
import { UserResponse } from './user.responses';
export class LicenseResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  licenseNumber: string;
  @ApiProperty()
  issuedBy: string;
  @ApiProperty()
  applicationId: string;
  @ApiProperty()
  validFrom: Date;
  @ApiProperty()
  validTo: Date;
  @ApiProperty()
  userId:string
  @ApiProperty()
  applierType:string
  @ApiProperty()
  status:string
  @ApiProperty()
  comment:string
  user:UserResponse

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
  static fromEntity(licenseEntity: LicenseEntity): LicenseResponse {
    const licenseResponse: LicenseResponse = new LicenseResponse();
    licenseResponse.id = licenseEntity?.id;
    licenseResponse.licenseNumber = licenseEntity?.licenseNumber;
    licenseResponse.issuedBy = licenseEntity?.issuedBy;
    licenseResponse.applicationId = licenseEntity?.applicationId;
    licenseResponse.userId = licenseEntity?.userId;
    licenseResponse.validFrom = licenseEntity?.validFrom;
    licenseResponse.validTo = licenseEntity?.validTo;
    licenseResponse.status = licenseEntity?.status;
    licenseResponse.comment = licenseEntity?.comment;
    licenseResponse.user = licenseEntity?.user?UserResponse.fromEntity(licenseEntity?.user):null;

    licenseResponse.createAt = licenseEntity?.createdAt
    licenseResponse.createdBy = licenseEntity?.createdBy
    licenseResponse.updatedAt = licenseEntity?.updatedAt
    licenseResponse.updatedBy = licenseEntity?.updatedBy
    licenseResponse.deletedAt = licenseEntity?.deletedAt
    licenseResponse.deletedBy = licenseEntity?.deletedBy
    return licenseResponse;
  }
  static fromDomain(license: License): LicenseResponse {
    const licenseResponse: LicenseResponse = new LicenseResponse();
    licenseResponse.id = license?.id;
    licenseResponse.licenseNumber = license?.licenseNumber;
    licenseResponse.issuedBy = license?.issuedBy;
    licenseResponse.applicationId = license?.applicationId;
    licenseResponse.userId = license?.userId;
    licenseResponse.validFrom = license?.validFrom;
    licenseResponse.validTo = license?.validTo;
    licenseResponse.status = license?.status;
    licenseResponse.comment = license?.comment;
    licenseResponse.user = license?.user?UserResponse.fromDomain(license?.user):null;

    licenseResponse.createAt = license?.createdAt
    licenseResponse.createdBy = license?.createdBy
    licenseResponse.updatedAt = license?.updatedAt
    licenseResponse.updatedBy = license?.updatedBy
    licenseResponse.deletedAt = license?.deletedAt
    licenseResponse.deletedBy = license?.deletedBy
    return licenseResponse;
  }
}
