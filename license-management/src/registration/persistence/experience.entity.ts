/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommonEntity } from './common.entity';
@Entity('experience')
export class LicenseApplicantexperienceEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'tin' })
  tin: string;
  @Column({ name: 'organization_name' })
  organizationName: string;
  @Column({ name: 'sub_city' })
  subCity: string;
  @Column({ name: 'woreda' })
  woreda: string;
  @Column({ name: 'kebela' })
  kebela: string;
  @Column({ name: 'file',nullable:true })
  file: string
  @Column({name:"user_id",nullable:true})
  userId:string
  @JoinColumn({name:'user_id'})
  @ManyToOne(
    () => UserEntity,
    (licenseApplication) => licenseApplication.education,
    {
      orphanedRowAction: 'delete',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  user: UserEntity;
}
