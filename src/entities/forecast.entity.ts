import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ForecastEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', { name: 'jsondata' })
  jsonData: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
