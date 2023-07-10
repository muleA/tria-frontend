/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommonEntity } from './common.entity';
import { LicenseEntity } from './License.entity';
@Entity('license_application')
export class LicenseApplicationEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({name:"license_id",nullable:true})
  licenseId: string;
  @Column("text",{name:"education_id",array: true, default: "{}"})
  educationId: string[]; 
  @Column("text",{name:"experience_id",array: true, default: "{}"})
  experienceId: string[];
  @Column({type:'text', name:"certificate_id",array: true, default: "{}"})
  certificateId: string[];
  @Column({name:"appointment_date",nullable:true})
  appointmentDate: Date;
  @Column({name:"application_type",default:'NEW'})
  applicationType:string
  @Column({name:"application_category",default:'Professional'})
  applicationCategory:string
  @Column({name:"applier_type",default:'OWNER'})
  applierType:string
  @Column({ name: 'file',nullable:true })
  file: string

  @Column({ name: 'facility-name',nullable:true })
  facilityName:string
  @Column({ name: 'state',nullable:true })
  state:string
  @Column({ name: 'sub-city',nullable:true })
  subCity:string  
  @Column({ name: 'woreda',nullable:true })
  woreda:string  
  @Column({ name: 'kebele',nullable:true })
  kebele:string
  @Column({ name: 'house-number',nullable:true })
  houseNumber:string
  @Column({ name: 'phone',nullable:true })
  phone:string
  @Column({ name: 'owner_name',nullable:true })
  ownerName:string
  @Column({ name: 'last_name',nullable:true })
  lastName:string
  @Column({ name: 'professinal-name',nullable:true })
  professionalName:string
  @Column({ name: 'professinal-lastname',nullable:true })
  professionalLastName:string
  @Column({ name: 'qualification-level',nullable:true })
  qualificationLevel:string
  @Column({ name: 'professinal-license-number',nullable:true })
  professionalLicenseNumber:string

  @Column({ name: 'delegation_file',nullable:true })
  delegationFile : string
  @Column({ name: 'applier_profile_picture',nullable:true })
  applierProfilePicture : string
  @Column({ name: 'comment',nullable:true })
  comment: string
//   appliaction statuse can be DRAFT,AJUST,SUBMITTED,ARCHIVED
  @Column({name:"status",default:'SUBMITED'})
  status:string
  @Column({name:"user_id",nullable:true})
  userId:string
  @JoinColumn({name:"user_id"})
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.applications, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
 })
  user:UserEntity
  @JoinColumn({name:'license_id'})
  @OneToOne(() => LicenseEntity, (licenseEntity) => licenseEntity.application, {cascade: true,
 })
 license  :LicenseEntity
}
