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

  @Column('jsonb')
  jsonData: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
