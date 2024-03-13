import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherEntity } from 'src/entities/weather.entity';
import { Repository } from 'typeorm';
import { WeatherForecastDto } from './dto/weather-forecast.dto';

@Injectable()
export class WeatherRepository {
  constructor(
    @InjectRepository(WeatherEntity)
    private readonly repository: Repository<WeatherEntity>,
  ) {}

  async saveWeather(weather: WeatherForecastDto) {
    try {
      return await this.repository.save({
        ...weather,
      });
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }

  //   async getWeather(
  //     lat: number,
  //     lon: number,
  //     part: number,
  //   ) {
  //     try {
  //       return await this.weatherRepository.findOne({
  //         where: {
  //           lat,
  //           lon,
  //           part,
  //         },
  //       });
  //     } catch (e) {
  //       if (e instanceof Error) {
  //         throw new Error(e.message);
  //       }
  //     }
  //   }
}
