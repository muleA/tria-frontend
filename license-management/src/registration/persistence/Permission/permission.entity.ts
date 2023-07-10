/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
  } from "typeorm";
import { CommonEntity } from "../common.entity";
import { RolePermissionEntity } from "../roles/role-permission.entity";
 
  @Entity({ name: "permission" })
  export class PermissionEntity extends CommonEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({name:'name', type: "jsonb" })
    name: string;
  
    @Column({ name:'description', nullable: true })
    description: string;
  
    @Column({name:'key'})
    key: string;
    @Column({name:"is_active",default:true})
    isActive: boolean;
    @OneToMany(
      () => RolePermissionEntity,
      (rolePermissions) => rolePermissions.permission,
      {
        cascade: true,
      }
    )
    rolePermissions: RolePermissionEntity[];
  }
  