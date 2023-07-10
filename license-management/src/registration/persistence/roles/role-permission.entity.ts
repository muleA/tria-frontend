/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { RoleEntity } from "./role.entity";
import { PermissionEntity } from "../Permission/permission.entity";
import { CommonEntity } from "../common.entity";

@Entity({ name: "role_permissions" })
export class RolePermissionEntity extends CommonEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ name: "role_id" })
  roleId: string;
  @Column({ name: "permission_name" })
  permissionName:string
  @ManyToOne(() => RoleEntity, (role) => role.rolePermission, {
    orphanedRowAction: "delete",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "role_id" })
  role: RoleEntity;
  @Column({ nullable: true, name: "permission_id" })
  permissionId: string;
  @ManyToOne(
    () => PermissionEntity,
    (Permission) => Permission.rolePermissions,
    {
      orphanedRowAction: "delete",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "permission_id" })
  permission: PermissionEntity;

}
