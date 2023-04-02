
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

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;


  @Column({ nullable: true, type: 'varchar' })
  first_name: string;

  @Column({ nullable: true, type: 'varchar' })
  last_name: string;

  @Column({ nullable: true, type: 'varchar' })
  mobile: string;

  @Column({ nullable: true, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  user_name: string;

  @Column({ nullable: true, type: 'varchar' })
  password: string;


  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
