
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
export class CustomerSenagogPivot extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;


  @Column({ nullable: false, type: 'bigint' })
  customer_id: number;

  @Column({ nullable: true, type: 'bigint' })
  senagog_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
