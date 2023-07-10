/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../common.entity';
import { EmployeeEntity } from './employee.entity';
import { RoleEntity } from '../roles/role.entity';

@Entity({ name: 'employee_role' })
export class EmployeeRoleEntity extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ default: true, name: 'is_active' })
    isActive: boolean;
    @Column({ name: 'role_name',nullable:true })
    roleName: string;
    @Column({ name: 'employee_id' })
    employeeId: string;
    @Column({ name: 'role_id' })
    roleId: string;

    @ManyToOne((type) => EmployeeEntity, (employeeEntity) => employeeEntity.employeeRole, {
        orphanedRowAction: 'delete',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'employee_id' })
    employee: EmployeeEntity;

    @ManyToOne((type) => RoleEntity, (roleEntity) => roleEntity.employeeRole, {
        orphanedRowAction: 'delete',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;

}
