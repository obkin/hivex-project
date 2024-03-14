import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherForecastDto } from './dto/weather-forecast.dto';
import { ForecastEntity } from 'src/entities/forecast.entity';

@Injectable()
export class WeatherRepository {
  constructor(
    @InjectRepository(ForecastEntity)
    private readonly repository: Repository<ForecastEntity>,
  ) {}

  async saveWeather(weather: WeatherForecastDto) {
    try {
      return await this.repository.save({
        jsonData: weather,
      });
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }

  // async getWeather(weatherLocation: GetWeatherDto) {
  //   try {
  //     return await this.repository.findOne({
  //       where: {
  //         // lat: weatherLocation.lat,
  //         // lon: weatherLocation.lon,
  //         // part: weatherLocation.part,
  //       },
  //     });
  //   } catch (e) {
  //     if (e instanceof Error) {
  //       throw new Error(e.message);
  //     }
  //   }
  // }
}
