
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'senagogs' })
export class Senagog extends BaseEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;


  @Column({ nullable: true, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;


  @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;


  @UpdateDateColumn({ type: 'timestamp',  default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
