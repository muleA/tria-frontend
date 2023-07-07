/* eslint-disable prettier/prettier */
import { License } from './License';
import { LicenseApplicantEducation } from './licenseApplicantEducation';
import { LicenseApplicantExperience } from './licenseApplicantExperience';
import { User } from './user';

export class LicenseApplication {
  id: string;

  licenseId: string;
  appointmentDate: Date;
  applicationType:string
  applicationCategory:string
  applierType:string
  status:string
  experienceId:string[]
  educationId:string[]
  certificateId:string[]
  user:User
  file:string
  delegationFile:string
  comment:string
  license:License
  facilityName:string
  state:string
  subCity:string  
  woreda:string  
  kebele:string  
  houseNumber:string
  phone:string
  ownerName:string
  lastName:string
  professionalName:string
  professionalLastName:string
  qualificationLevel:string
  professionalLicenseNumber:string
  applierProfilePicture:string

  userId:string
  createdAt: Date
  createdBy: string
  deletedAt: Date
  deletedBy: string
  updatedAt: Date
  updatedBy: string
}