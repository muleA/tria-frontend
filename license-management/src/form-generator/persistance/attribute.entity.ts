/* eslint-disable prettier/prettier */
import { CommonEntity } from 'src/registration/persistence/common.entity';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { FormEntity } from './form.entity';

@Entity('form_attribute')
export class FormAttributeEntity extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ name: "name" })
    name: string;
    @Column({ name: "version" })
    dependsOn: string;
    @Column({ name: "is_active" })
    description: string;
    @Column({ name: "code" })
    code: string;
    @Column({ name: "status" })
    status: string;
    @Column({ name: "display-to" })
    displayTo: string;
    @Column({ name: "depends-when" })
    dependsWhen: string;
    @Column({ name: "validation" })
    validation: string;
    @Column({ name: "reg-ex" })
    regEx: string;
    @Column({ name: "data-type-description" })
    dataTypeDescription: string;
    @Column({ name: "group" })
    group: string;
    @Column({ name: "agent-only-form-attibute" ,default:false})
    agentOnlyFormAttibute: boolean;
    @Column({ name: "is-deleted",default:false })
    isDeleted: boolean;
    @Column({ name: "iscalculated",default:false })
    isCalculated: boolean;
    @Column({ name: "is-readOnly" ,default:false})
    isReadOnly: boolean;
    @Column({ name: "is-systemform",default:false })
    isSystemForm: boolean;
    @Column({ name: "is-required",default:false })
    isRequired: boolean;
    @Column({ name: "is-default",default:true })
    isDefault: boolean;
    @Column({ name: "is-variable",default:true })
    isVariable: boolean;
    @Column({ name: "is-default-editable-except-order",default:true })
    isDefaultEditableExceptOrder: boolean;
    @Column({ name: "is-case-clasification",default:true })
    isCaseClasification: boolean;
    @Column({ name: "can-cutomer-edit",default:true })
    canCutomerEdit: boolean;
    @Column({ name: "can-case-worker-edit",default:true })
    canCaseWorkerEdit: boolean;
    @Column({ name: "feild-order" })
    feildOrder: number;
    @Column({ name: "pages" })
    pages: number;
    @Column({ name: "form_id" })
    formId: string;
    @JoinColumn({ name: 'form_id' })
    @ManyToOne(
        () => FormEntity,
        (formEntity) => formEntity.formAttributes,
        {
            orphanedRowAction: 'delete',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    )
    form: FormEntity
}
