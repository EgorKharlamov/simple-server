import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export default class UsersOrm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 30, nullable: true, default: null })
  email: string | null;

  @Column({ type: 'varchar', length: 80 })
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: true, default: null })
  name: string | null;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: Date | null;
}
