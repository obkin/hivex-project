import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherEntity } from 'src/entities/weather.entity';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerService } from 'src/logger/logger.service';
import { WeatherRepository } from './weather.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherEntity]), DatabaseModule],
  providers: [WeatherService, LoggerService, WeatherRepository],
  controllers: [WeatherController],
})
export class WeatherModule {}
