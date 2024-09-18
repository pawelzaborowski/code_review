import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title: string;

  @Column()
  interval: number;

  @Column({ default: 'created' })
  status: string;

  @Column()
  description?: string;

  @Column()
  value: number;

  @Column()
  userId: UserEntity;

  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);
  }
}
