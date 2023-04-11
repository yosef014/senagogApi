import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Generated,
  BaseEntity,
} from 'typeorm';
import WrapperEntity from "../../../helpers/wrapperEntity/wrapper-entity";

@Entity({ name: 'users' })
export class User extends WrapperEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  is_active: boolean;

  @Column({ nullable: true })
  fist_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  senagog_id: number;

  @Column({ nullable: true })
  user_name: string

  ;
  @Column({ nullable: true, unique: true })
  mobile: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  permission_type: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  last_logged: Date;

  @CreateDateColumn({ type: 'timestamp', default: new Date() })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
