import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class WeatherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sunrise: number;

  @Column()
  sunset: number;

  @Column()
  temp: number;

  @Column()
  feels_like: number;

  @Column()
  pressure: number;

  @Column()
  humidity: number;

  @Column()
  uvi: number;

  @Column()
  wind_speed: number;

  @CreateDateColumn()
  createdAt: Date;
}
