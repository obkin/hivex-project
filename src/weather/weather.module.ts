import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerService } from 'src/logger/logger.service';
import { WeatherRepository } from './weather.repository';
import { ForecastEntity } from 'src/entities/forecast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ForecastEntity]), DatabaseModule],
  providers: [WeatherService, LoggerService, WeatherRepository],
  controllers: [WeatherController],
})
export class WeatherModule {}
