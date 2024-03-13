import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherEntity } from 'src/entities/weather.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherEntity]), DatabaseModule],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
