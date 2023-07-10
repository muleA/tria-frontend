/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { Certificate } from '../domain/Certificate';
import { CertificateEntity } from '../persistence/certificate.entity';
export class CertificateResponse{
  @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  id: string
  @ApiProperty()
  userId: string
  @ApiProperty()
  Institution: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  certificateTitle: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  receivedDate: string;
  @ApiProperty()
  file: string;

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

  static fromEntity(certificateEntity: CertificateEntity): CertificateResponse {
    const certificateResponse: CertificateResponse = new CertificateResponse();
    certificateResponse.id = certificateEntity?.id;
    certificateResponse.userId = certificateEntity?.userId;
    certificateResponse.Institution = certificateEntity?.Institution;
    certificateResponse.certificateTitle = certificateEntity?.certificateTitle;
    certificateResponse.name = certificateEntity?.name;
    certificateResponse.receivedDate = certificateEntity?.receivedDate;
    certificateResponse.startDate = certificateEntity?.startDate;
    certificateResponse.file = certificateEntity?.file;

    certificateResponse.createdAt=certificateEntity?.createdAt
    certificateResponse.createdBy=certificateEntity?.createdBy
    certificateResponse.updatedAt=certificateEntity?.updatedAt
    certificateResponse.updatedBy=certificateEntity?.updatedBy
    certificateResponse.deletedAt=certificateEntity?.deletedAt
    certificateResponse.deletedBy=certificateEntity?.deletedBy
    return certificateResponse;
  }
  static fromDomain(certificate: Certificate): CertificateResponse {
    const certificateResponse: CertificateResponse = new CertificateResponse();
    certificateResponse.id = certificate.id;
    certificateResponse.userId = certificate.userId;
    certificateResponse.Institution = certificate.Institution;
    certificateResponse.certificateTitle = certificate.certificateTitle;
    certificateResponse.name = certificate.name;
    certificateResponse.receivedDate = certificate.receivedDate;
    certificateResponse.startDate = certificate.startDate;
    certificateResponse.file = certificate.file;

    certificateResponse.createdAt=certificate.createdAt
    certificateResponse.createdBy=certificate.createdBy
    certificateResponse.updatedAt=certificate.updatedAt
    certificateResponse.updatedBy=certificate.updatedBy
    certificateResponse.deletedAt=certificate.deletedAt
    certificateResponse.deletedBy=certificate.deletedBy
    return certificateResponse;
  }
}