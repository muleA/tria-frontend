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
@Entity('certificate')
export class CertificateEntity  extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ name: 'institution' })
    Institution: string;
    @Column({ name: 'user_id',nullable:true })
    userId: string;
    @Column({ name: 'name' })
    name: string;
    @Column({ name: 'certificate_title' })
    certificateTitle: string;
    @Column({ name: 'start_date' })
    startDate: Date;
    @Column({ name: 'received_date' })
    receivedDate: string;
    @Column({ name: 'file',nullable:true })
    file:string
    
    @JoinColumn({name:'user_id'})
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.certificate, {
      orphanedRowAction: 'delete',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
   })
   user:UserEntity
  }