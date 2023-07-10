/* eslint-disable prettier/prettier */
import { User } from "./user";
export class LicenseApplicantEducation {
  id:string
  userId:string
  Institution: string;
  fieldOfStudy: string;
  professionalTitle: string;
  studentIdNumber: string;
  receivedDate: string;
  file:string
  user:User
  kebele:string
  organizationName:string
  subCity:string
  tin:string
  woreda:string
  createdAt: Date
  createdBy: string
  deletedAt: Date
  deletedBy: string
  updatedAt: Date
  updatedBy: string
}
