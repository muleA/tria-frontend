/* eslint-disable prettier/prettier */

import { FormAttributeEntity } from "../persistance/attribute.entity";
import { UpdateFormAttributeCommand } from "../usecases/formAttribute.command";
import { FormAttribute } from "./formAttributes";



export class Form {
  id: string;
  name: string;
  version: string;
  isActive: string;
  code: string;
  status: string;
  isSystemForm: boolean;
  formAttributes: FormAttribute[];


  createdAt: Date
  createdBy: string
  deletedAt: Date
  deletedBy: string
  updatedAt: Date
  updatedBy: string

  updateFormAttribute(command:FormAttribute){
    const index=this.formAttributes.findIndex((element)=>element.id==command.id)
    this.formAttributes[index]=command
  }
  removeFormAttribute(formAttributeId:string){
    this.formAttributes.filter((element)=>element.id!==formAttributeId)
  }
}