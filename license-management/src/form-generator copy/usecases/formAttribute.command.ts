import { ApiProperty } from "@nestjs/swagger";
import { FormAttribute } from "../domain/formAttributes";

export class CreateFormAttributeCommand {
    
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    dependsOn: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    code: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    displayTo: string;
    @ApiProperty()
    dependsWhen: string;
    @ApiProperty()
    validation: string;
    @ApiProperty()
    regEx: string;
    @ApiProperty()
    dataTypeDescription: string;
    @ApiProperty()
    group: string;
    @ApiProperty()
    agentOnlyFormAttibute: boolean;
    @ApiProperty()
    isDeleted: boolean;
    @ApiProperty()
    isCalculated: boolean;
    @ApiProperty()
    isReadOnly: boolean;
    @ApiProperty()
    isSystemForm: boolean;
    @ApiProperty()
    isRequired: boolean;
    @ApiProperty()
    isDefault: boolean;
    @ApiProperty()
    isVariable: boolean;
    @ApiProperty()
    isDefaultEditableExceptOrder: boolean;
    @ApiProperty()
    isCaseClasification: boolean;
    @ApiProperty()
    canCutomerEdit: boolean;
    @ApiProperty()
    canCaseWorkerEdit: boolean;
    @ApiProperty()
    feildOrder: number;
    @ApiProperty()
    pages: number;
    @ApiProperty()
    formId: string;

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

    static fromCommands(createFormAttributeCommand: CreateFormAttributeCommand): FormAttribute {
        const formAttribute: FormAttribute = new FormAttribute();
        formAttribute.id=createFormAttributeCommand.id
        formAttribute.name=createFormAttributeCommand?.name
        formAttribute.dependsOn=createFormAttributeCommand?.dependsOn
        formAttribute.description=createFormAttributeCommand?.description
        formAttribute.code=createFormAttributeCommand?.code
        formAttribute.status=createFormAttributeCommand?.status
        formAttribute.displayTo=createFormAttributeCommand?.displayTo
        formAttribute.dependsWhen=createFormAttributeCommand?.dependsWhen
        formAttribute.validation=createFormAttributeCommand?.validation
        formAttribute.regEx=createFormAttributeCommand?.regEx
        formAttribute.dataTypeDescription=createFormAttributeCommand?.dataTypeDescription
        formAttribute.group=createFormAttributeCommand?.group
        formAttribute.agentOnlyFormAttibute=createFormAttributeCommand?.agentOnlyFormAttibute
        formAttribute.isDeleted=createFormAttributeCommand?.isDeleted
        formAttribute.isCalculated=createFormAttributeCommand?.isCalculated
        formAttribute.isReadOnly=createFormAttributeCommand?.isReadOnly
        formAttribute.isSystemForm=createFormAttributeCommand?.isSystemForm
        formAttribute.isRequired=createFormAttributeCommand?.isRequired
        formAttribute.isDefault=createFormAttributeCommand?.isDefault
        formAttribute.isVariable=createFormAttributeCommand?.isVariable
        formAttribute.isDefaultEditableExceptOrder=createFormAttributeCommand?.isDefaultEditableExceptOrder
        formAttribute.isCaseClasification=createFormAttributeCommand?.isCaseClasification
        formAttribute.canCutomerEdit=createFormAttributeCommand?.canCutomerEdit
        formAttribute.canCaseWorkerEdit=createFormAttributeCommand?.canCaseWorkerEdit
        formAttribute.feildOrder=createFormAttributeCommand?.feildOrder
        formAttribute.pages=createFormAttributeCommand?.pages
        formAttribute.formId=createFormAttributeCommand?.formId
        return formAttribute;
    }
}
export class UpdateFormAttributeCommand {
    
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    dependsOn: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    code: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    displayTo: string;
    @ApiProperty()
    dependsWhen: string;
    @ApiProperty()
    validation: string;
    @ApiProperty()
    regEx: string;
    @ApiProperty()
    dataTypeDescription: string;
    @ApiProperty()
    group: string;
    @ApiProperty()
    agentOnlyFormAttibute: boolean;
    @ApiProperty()
    isDeleted: boolean;
    @ApiProperty()
    isCalculated: boolean;
    @ApiProperty()
    isReadOnly: boolean;
    @ApiProperty()
    isSystemForm: boolean;
    @ApiProperty()
    isRequired: boolean;
    @ApiProperty()
    isDefault: boolean;
    @ApiProperty()
    isVariable: boolean;
    @ApiProperty()
    isDefaultEditableExceptOrder: boolean;
    @ApiProperty()
    isCaseClasification: boolean;
    @ApiProperty()
    canCutomerEdit: boolean;
    @ApiProperty()
    canCaseWorkerEdit: boolean;
    @ApiProperty()
    feildOrder: number;
    @ApiProperty()
    pages: number;
    @ApiProperty()
    formId: string;

    @ApiProperty()
    createAt: Date
    // @ApiProperty()
    createdBy: string
    @ApiProperty()
    UpdatedAt: Date
    // @ApiProperty()
    updatedBy: string
    // @ApiProperty()
    deletedAt: Date
    // @ApiProperty()
    deletedBy: string

    static fromCommands(updateFormAttributeCommand: UpdateFormAttributeCommand): FormAttribute {
        const formAttribute: FormAttribute = new FormAttribute();
        formAttribute.id=updateFormAttributeCommand.id
        formAttribute.name=updateFormAttributeCommand?.name
        formAttribute.dependsOn=updateFormAttributeCommand?.dependsOn
        formAttribute.description=updateFormAttributeCommand?.description
        formAttribute.code=updateFormAttributeCommand?.code
        formAttribute.status=updateFormAttributeCommand?.status
        formAttribute.displayTo=updateFormAttributeCommand?.displayTo
        formAttribute.dependsWhen=updateFormAttributeCommand?.dependsWhen
        formAttribute.validation=updateFormAttributeCommand?.validation
        formAttribute.regEx=updateFormAttributeCommand?.regEx
        formAttribute.dataTypeDescription=updateFormAttributeCommand?.dataTypeDescription
        formAttribute.group=updateFormAttributeCommand?.group
        formAttribute.agentOnlyFormAttibute=updateFormAttributeCommand?.agentOnlyFormAttibute
        formAttribute.isDeleted=updateFormAttributeCommand?.isDeleted
        formAttribute.isCalculated=updateFormAttributeCommand?.isCalculated
        formAttribute.isReadOnly=updateFormAttributeCommand?.isReadOnly
        formAttribute.isSystemForm=updateFormAttributeCommand?.isSystemForm
        formAttribute.isRequired=updateFormAttributeCommand?.isRequired
        formAttribute.isDefault=updateFormAttributeCommand?.isDefault
        formAttribute.isVariable=updateFormAttributeCommand?.isVariable
        formAttribute.isDefaultEditableExceptOrder=updateFormAttributeCommand?.isDefaultEditableExceptOrder
        formAttribute.isCaseClasification=updateFormAttributeCommand?.isCaseClasification
        formAttribute.canCutomerEdit=updateFormAttributeCommand?.canCutomerEdit
        formAttribute.canCaseWorkerEdit=updateFormAttributeCommand?.canCaseWorkerEdit
        formAttribute.feildOrder=updateFormAttributeCommand?.feildOrder
        formAttribute.pages=updateFormAttributeCommand?.pages
        formAttribute.formId=updateFormAttributeCommand?.formId
        return formAttribute;
    }
}