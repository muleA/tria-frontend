/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn
} from 'typeorm';
@Entity('CommonEntity')
export class CommonEntity   {
    @Column({ nullable: true, name: 'created_by' })
    createdBy?: string;
    @Column({ nullable: true, name: 'updated_by' })
    updatedBy?: string;
    @CreateDateColumn({ type: "timestamptz", default: "now()", name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ type: "timestamptz", default: "now()", name: 'updated_at' })
    updatedAt: Date;
    @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
    deletedAt: Date;
    @Column({ nullable: true, name: 'deleted_by' })
    deletedBy: string;
}
