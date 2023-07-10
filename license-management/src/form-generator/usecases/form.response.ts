import { ApiProperty } from "@nestjs/swagger";
import { CreateFormAttributeCommand } from "./formAttribute.command";
import { FormEntity } from "../persistance/form.entity";
import { FormAttributeResponse } from "./formAttribute.response";
import { Form } from "../domain/form";

export class FormResponse{
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    version: string;
    @ApiProperty()
    code: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    isSystemForm: boolean;
    @ApiProperty()
    formAttributes: FormAttributeResponse[]

    @ApiProperty()
    createAt: Date
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

    static fromEntity(formEntity: FormEntity): FormResponse {
        const formResponse: FormResponse = new FormResponse();
        formResponse.id = formEntity.id
        formResponse.name = formEntity.name
        formResponse.version = formEntity.version
        formResponse.code = formEntity.code
        formResponse.status = formEntity.status
        formResponse.isSystemForm = formEntity.isSystemForm
        formResponse.formAttributes=formEntity?.formAttributes?.map((element)=>FormAttributeResponse.fromEntity(element))

        formResponse.createdBy = formEntity.createdBy
        formResponse.updatedAt = formEntity.updatedAt
        formResponse.updatedBy = formEntity.updatedBy
        formResponse.deletedAt = formEntity.deletedAt
        formResponse.deletedBy = formEntity.deletedBy
        return formResponse;
    }
    static fromDomain(form: Form): FormResponse {
        const formResponse: FormResponse = new FormResponse();
        formResponse.id = form.id
        formResponse.name = form.name
        formResponse.version = form.version
        formResponse.code = form.code
        formResponse.status = form.status
        formResponse.isSystemForm = form.isSystemForm
        formResponse.formAttributes=form?.formAttributes?.map((element)=>FormAttributeResponse.fromDomain(element))

        formResponse.createdBy = form.createdBy
        formResponse.updatedAt = form.updatedAt
        formResponse.updatedBy = form.updatedBy
        formResponse.deletedAt = form.deletedAt
        formResponse.deletedBy = form.deletedBy
        return formResponse;
    }
}