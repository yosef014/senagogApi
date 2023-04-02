
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'vows' })
export class Vow extends BaseEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;


  @Column({ nullable: true, type: 'bigint' })
  customer_id: number;

  @Column({ nullable: true, type: 'bigint' })
  price: number;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @Column({ nullable: true, type: 'varchar' })
  name: string;


  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
