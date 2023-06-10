/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { Certificate } from '../domain/Certificate';
export class CreateCertificateCommand {
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
  Institution: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  certificateTitle: string;
  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  receivedDate: string;
  // @ApiProperty()
  // @IsNotEmpty()
  file: string;

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

  static fromCommands(createCertificateCommand: CreateCertificateCommand): Certificate {
    const certificate: Certificate = new Certificate();
    certificate.id = createCertificateCommand?.id;
    certificate.userId = createCertificateCommand.userId;
    certificate.Institution = createCertificateCommand.Institution;
    certificate.certificateTitle = createCertificateCommand.certificateTitle;
    certificate.name = createCertificateCommand.name;
    certificate.receivedDate = createCertificateCommand.receivedDate;
    certificate.startDate = createCertificateCommand.startDate;
    certificate.file = createCertificateCommand?.file;

    certificate.createdAt=createCertificateCommand.createAt
    certificate.createdBy=createCertificateCommand.createdBy
    certificate.updatedAt=createCertificateCommand.UpdatedAt
    certificate.updatedBy=createCertificateCommand.updatedBy
    certificate.deletedAt=createCertificateCommand.deletedAt
    certificate.deletedBy=createCertificateCommand.deletedBy



    return certificate;
  }
}
export class UpdateCertificateCommand {
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
  Institution: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  certificateTitle: string;
  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  receivedDate: string;
  // @ApiProperty()
  // @IsNotEmpty()
  file: string;

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

  static fromCommands(updateCertificateCommand: UpdateCertificateCommand): Certificate {
    const certificate: Certificate = new Certificate();

    certificate.id = updateCertificateCommand?.id;
    certificate.userId = updateCertificateCommand.userId;
    certificate.Institution = updateCertificateCommand.Institution;
    certificate.certificateTitle = updateCertificateCommand.certificateTitle;
    certificate.name = updateCertificateCommand.name;
    certificate.receivedDate = updateCertificateCommand.receivedDate;
    certificate.startDate = updateCertificateCommand.startDate;
    certificate.file = updateCertificateCommand?.file;

    certificate.createdAt=updateCertificateCommand.createAt
    certificate.createdBy=updateCertificateCommand.createdBy
    certificate.updatedAt=updateCertificateCommand.UpdatedAt
    certificate.updatedBy=updateCertificateCommand.updatedBy
    certificate.deletedAt=updateCertificateCommand.deletedAt
    certificate.deletedBy=updateCertificateCommand.deletedBy



    return certificate;
  }
}
