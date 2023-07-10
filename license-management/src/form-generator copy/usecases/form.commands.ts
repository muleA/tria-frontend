import { ApiProperty } from "@nestjs/swagger";
import { FormAttribute } from "../domain/formAttributes";
import { Form } from "../domain/form";
import { CreateFormAttributeCommand, UpdateFormAttributeCommand } from "./formAttribute.command";

export class CreateFormCommand {
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
    // formAttribute: CreateFormAttributeCommand[]

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

    static fromCommands(createFormCommand: CreateFormCommand): Form {
        const form: Form = new Form();
        form.id = createFormCommand.id
        form.name = createFormCommand.name
        form.version = createFormCommand?.version
        form.code = createFormCommand.code
        form.status = createFormCommand?.status
        form.isSystemForm = createFormCommand?.isSystemForm
        // form.formAttributes=createFormCommand?.formAttribute?.map((element)=>CreateFormAttributeCommand.fromCommands(element))

        form.createdBy = createFormCommand.createdBy
        form.updatedAt = createFormCommand.UpdatedAt
        form.updatedBy = createFormCommand.updatedBy
        form.deletedAt = createFormCommand.deletedAt
        form.deletedBy = createFormCommand.deletedBy
        return form;
    }
}
export class UpdateFormCommand {
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
    formAttributes: UpdateFormAttributeCommand[];



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

    static fromCommands(updateFormCommand: UpdateFormCommand): Form {
        const form: Form = new Form();
        form.id = updateFormCommand.id
        form.name = updateFormCommand.name
        form.version = updateFormCommand.version
        form.code = updateFormCommand.code
        form.status = updateFormCommand.status
        form.isSystemForm = updateFormCommand.isSystemForm
        form.formAttributes = updateFormCommand?.formAttributes?.map((element) => UpdateFormAttributeCommand.fromCommands(element))

        form.createdBy = updateFormCommand.createdBy
        form.updatedAt = updateFormCommand.UpdatedAt
        form.updatedBy = updateFormCommand.updatedBy
        form.deletedAt = updateFormCommand.deletedAt
        form.deletedBy = updateFormCommand.deletedBy
        return form;
    }
}
export class AddAttributeToFormCommand {
    @ApiProperty()
    formId: string;
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
    formAttributes: UpdateFormAttributeCommand[];



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

    static fromCommands(updateFormCommand: UpdateFormCommand): Form {
        const form: Form = new Form();
        form.id = updateFormCommand?.id
        form.name = updateFormCommand.name
        form.version = updateFormCommand?.version
        form.code = updateFormCommand.code
        form.status = updateFormCommand?.status
        form.isSystemForm = updateFormCommand?.isSystemForm
        form.formAttributes = updateFormCommand?.formAttributes?.map((element) => UpdateFormAttributeCommand.fromCommands(element))

        form.createdBy = updateFormCommand.createdBy
        form.updatedAt = updateFormCommand.UpdatedAt
        form.updatedBy = updateFormCommand.updatedBy
        form.deletedAt = updateFormCommand.deletedAt
        form.deletedBy = updateFormCommand.deletedBy
        return form;
    }
}