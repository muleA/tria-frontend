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
import { EmployeeRoleEntity } from '../Employee/employee-role.entity';
import { RolePermissionEntity } from './role-permission.entity';
  
  @Entity({ name: 'roles' })
  export class RoleEntity extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'jsonb' })
    name: string;
    @Column()
    description: string;
    @Column({ unique: true })
    key: string;
    @Column({ nullable: true, default: true, name: 'is_default' })
    isDefault: boolean;
  
    @OneToMany(
      () => EmployeeRoleEntity,
      (employeeRoleEntity) => employeeRoleEntity.role,
      {
        cascade: true,
      }
    )
    employeeRole: EmployeeRoleEntity[];

    @OneToMany(
      () => RolePermissionEntity,
      (rolePermissionEntity) => rolePermissionEntity.role,
      {
        cascade: true,
      }
    )
    rolePermission: RolePermissionEntity[];
  }
  