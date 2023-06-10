/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { LicenseApplicantEducation } from '../domain/licenseApplicantEducation';
import { LicenseApplicantEducationEntity } from '../persistence/education.entity';
export class EducationResponse {
  @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  id: string
  @ApiProperty()
  userId: string
  Institution: string;
  @ApiProperty()
  fieldOfStudy: string;
  @ApiProperty()
  professionalTitle: string;
  @ApiProperty()
  studentIdNumber: string;
  @ApiProperty()
  receivedDate: string;
  // @ApiProperty()
  file: string;

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
  static fromEntity(licenseApplicantEducationEntity: LicenseApplicantEducationEntity): EducationResponse {
    const educationResponse: EducationResponse = new EducationResponse();

    educationResponse.id = licenseApplicantEducationEntity.id;
    educationResponse.userId = licenseApplicantEducationEntity.userId;
    educationResponse.Institution = licenseApplicantEducationEntity.Institution;
    educationResponse.fieldOfStudy = licenseApplicantEducationEntity.fieldOfStudy;
    educationResponse.professionalTitle = licenseApplicantEducationEntity.professionalTitle;
    educationResponse.receivedDate = licenseApplicantEducationEntity.receivedDate;
    educationResponse.studentIdNumber = licenseApplicantEducationEntity.studentIdNumber;
    educationResponse.file = licenseApplicantEducationEntity?.file;

    educationResponse.createAt = licenseApplicantEducationEntity.createdAt
    educationResponse.createdBy = licenseApplicantEducationEntity.createdBy
    educationResponse.updatedAt = licenseApplicantEducationEntity.updatedAt
    educationResponse.updatedBy = licenseApplicantEducationEntity.updatedBy
    educationResponse.deletedAt = licenseApplicantEducationEntity.deletedAt
    educationResponse.deletedBy = licenseApplicantEducationEntity.deletedBy
    return educationResponse;
  }
  static fromDomain(licenseApplicantEducation: LicenseApplicantEducation): EducationResponse {
    const educationResponse: EducationResponse = new EducationResponse();
    educationResponse.id = licenseApplicantEducation.id;
    educationResponse.userId = licenseApplicantEducation.userId;
    educationResponse.Institution = licenseApplicantEducation.Institution;
    educationResponse.fieldOfStudy = licenseApplicantEducation.fieldOfStudy;
    educationResponse.professionalTitle = licenseApplicantEducation.professionalTitle;
    educationResponse.receivedDate = licenseApplicantEducation.receivedDate;
    educationResponse.studentIdNumber = licenseApplicantEducation.studentIdNumber;
    educationResponse.file = licenseApplicantEducation?.file;

    educationResponse.createAt = licenseApplicantEducation.createdAt
    educationResponse.createdBy = licenseApplicantEducation.createdBy
    educationResponse.updatedAt = licenseApplicantEducation.updatedAt
    educationResponse.updatedBy = licenseApplicantEducation.updatedBy
    educationResponse.deletedAt = licenseApplicantEducation.deletedAt
    educationResponse.deletedBy = licenseApplicantEducation.deletedBy
    return educationResponse;
  }
}
