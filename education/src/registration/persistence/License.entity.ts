/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { UserEntity } from './user.entity';
  import { CommonEntity } from './common.entity';
import { LicenseApplicationEntity } from './application.entity';
  @Entity('license')
  export class LicenseEntity extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({name:"license_number",nullable:true})
    licenseNumber: string;
    @Column({name:"valid_from",default:new Date()})
    validFrom: Date;
    @Column({name:"valid_to"})
    validTo: Date;
    @Column({name:"user_id"})
    userId:string
    @Column({name:"issued_by",nullable:true})
    issuedBy: string;
    @Column({name:"comment",nullable:true})
    comment:string
  //   appliaction statuse can be DRAFT,AJUST,SUBMITTED,ARCHIVED
    @Column({name:"status",default:'ACTIVE'})
    status:string
  @JoinColumn({ name: 'user_id'})
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.license, {
      orphanedRowAction: 'delete',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
   })
    user:UserEntity
    @Column({ name: 'application_id' })
    applicationId: string;
    @OneToOne(() => LicenseApplicationEntity, (licenseApplicationEntity) => licenseApplicationEntity.license, {
        orphanedRowAction: 'delete',
     })
      application:LicenseApplicationEntity
  }
  