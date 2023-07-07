/* eslint-disable prettier/prettier */

import { FormEntity } from "../persistance/form.entity";
import { Form } from "./form";




export class FormAttribute {
  id: string;
  name: string;
  dependsOn: string;
  description: string;
  code: string;
  status: string;
  displayTo: string;
  dependsWhen: string;
  validation: string;
  regEx: string;
  dataTypeDescription: string;
  group: string;
  agentOnlyFormAttibute: boolean;
  isDeleted: boolean;
  isCalculated: boolean;
  isReadOnly: boolean;
  isSystemForm: boolean;
  isRequired: boolean;
  isDefault: boolean;
  isVariable: boolean;
  isDefaultEditableExceptOrder: boolean;
  isCaseClasification: boolean;
  canCutomerEdit: boolean;
  canCaseWorkerEdit: boolean;
  feildOrder: number;
  pages: number;
  formId: string;
  form: Form


  createdAt: Date
  createdBy: string
  deletedAt: Date
  deletedBy: string
  updatedAt: Date
  updatedBy: string

  // async updateRole(role: Role) {
  // const existIndex = this.expiriance.findIndex(
  //   (element) => element.id == licenseApplicantEducation.id
  // );
  // this.education[existIndex] = licenseApplicantEducation;
  // }
  // async updateExpiriance(licenseApplicantExperience: LicenseApplicantExperience) {
  //   const existIndex = this.expiriance.findIndex(
  //     (element) => element.id == licenseApplicantExperience.id
  //   );
  //   this.expiriance[existIndex] = licenseApplicantExperience;
  // }

}