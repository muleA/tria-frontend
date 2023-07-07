import { ApiProperty } from "@nestjs/swagger";
import { FormAttributeEntity } from "../persistance/attribute.entity";
import { FormAttribute } from "../domain/formAttributes";
import { Common } from "src/registration/domain/common";

export class FormAttributeResponse  extends Common{
    
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
    // @ApiProperty()
    UpdatedAt: Date
    // @ApiProperty()
    updatedBy: string
    // @ApiProperty()
    deletedAt: Date
    // @ApiProperty()
    deletedBy: string

    static fromEntity(formAttributeEntity: FormAttributeEntity): FormAttributeResponse {
        const formAttributeResponse: FormAttributeResponse = new FormAttributeResponse();
        formAttributeResponse.id=formAttributeEntity.id
        formAttributeResponse.name=formAttributeEntity?.name
        formAttributeResponse.dependsOn=formAttributeEntity?.dependsOn
        formAttributeResponse.description=formAttributeEntity?.description
        formAttributeResponse.code=formAttributeEntity?.code
        formAttributeResponse.status=formAttributeEntity?.status
        formAttributeResponse.displayTo=formAttributeEntity?.displayTo
        formAttributeResponse.dependsWhen=formAttributeEntity?.dependsWhen
        formAttributeResponse.validation=formAttributeEntity?.validation
        formAttributeResponse.regEx=formAttributeEntity?.regEx
        formAttributeResponse.dataTypeDescription=formAttributeEntity?.dataTypeDescription
        formAttributeResponse.group=formAttributeEntity?.group
        formAttributeResponse.agentOnlyFormAttibute=formAttributeEntity?.agentOnlyFormAttibute
        formAttributeResponse.isDeleted=formAttributeEntity?.isDeleted
        formAttributeResponse.isCalculated=formAttributeEntity?.isCalculated
        formAttributeResponse.isReadOnly=formAttributeEntity?.isReadOnly
        formAttributeResponse.isSystemForm=formAttributeEntity?.isSystemForm
        formAttributeResponse.isRequired=formAttributeEntity?.isRequired
        formAttributeResponse.isDefault=formAttributeEntity?.isDefault
        formAttributeResponse.isVariable=formAttributeEntity?.isVariable
        formAttributeResponse.isDefaultEditableExceptOrder=formAttributeEntity?.isDefaultEditableExceptOrder
        formAttributeResponse.isCaseClasification=formAttributeEntity?.isCaseClasification
        formAttributeResponse.canCutomerEdit=formAttributeEntity?.canCutomerEdit
        formAttributeResponse.canCaseWorkerEdit=formAttributeEntity?.canCaseWorkerEdit
        formAttributeResponse.feildOrder=formAttributeEntity?.feildOrder
        formAttributeResponse.pages=formAttributeEntity?.pages
        formAttributeResponse.formId=formAttributeEntity?.formId
        return formAttributeResponse;
    }
    static fromDomain(formAttribute: FormAttribute): FormAttributeResponse {
        const formAttributeResponse: FormAttributeResponse = new FormAttributeResponse();
        formAttributeResponse.id=formAttribute.id
        formAttributeResponse.name=formAttribute?.name
        formAttributeResponse.dependsOn=formAttribute?.dependsOn
        formAttributeResponse.description=formAttribute?.description
        formAttributeResponse.code=formAttribute?.code
        formAttributeResponse.status=formAttribute?.status
        formAttributeResponse.displayTo=formAttribute?.displayTo
        formAttributeResponse.dependsWhen=formAttribute?.dependsWhen
        formAttributeResponse.validation=formAttribute?.validation
        formAttributeResponse.regEx=formAttribute?.regEx
        formAttributeResponse.dataTypeDescription=formAttribute?.dataTypeDescription
        formAttributeResponse.group=formAttribute?.group
        formAttributeResponse.agentOnlyFormAttibute=formAttribute?.agentOnlyFormAttibute
        formAttributeResponse.isDeleted=formAttribute?.isDeleted
        formAttributeResponse.isCalculated=formAttribute?.isCalculated
        formAttributeResponse.isReadOnly=formAttribute?.isReadOnly
        formAttributeResponse.isSystemForm=formAttribute?.isSystemForm
        formAttributeResponse.isRequired=formAttribute?.isRequired
        formAttributeResponse.isDefault=formAttribute?.isDefault
        formAttributeResponse.isVariable=formAttribute?.isVariable
        formAttributeResponse.isDefaultEditableExceptOrder=formAttribute?.isDefaultEditableExceptOrder
        formAttributeResponse.isCaseClasification=formAttribute?.isCaseClasification
        formAttributeResponse.canCutomerEdit=formAttribute?.canCutomerEdit
        formAttributeResponse.canCaseWorkerEdit=formAttribute?.canCaseWorkerEdit
        formAttributeResponse.feildOrder=formAttribute?.feildOrder
        formAttributeResponse.pages=formAttribute?.pages
        formAttributeResponse.formId=formAttribute?.formId
        return formAttributeResponse;
    }
}