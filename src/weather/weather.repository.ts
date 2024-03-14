import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherForecastDto } from './dto/weather-forecast.dto';
import { ForecastEntity } from 'src/entities/forecast.entity';
import { GetWeatherDto } from './dto/weather-get.dto';

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

  async getWeather({ lon, lat, part }: GetWeatherDto) {
    try {
      console.log(part);
      return await this.repository
        .createQueryBuilder('forecast')
        .where(
          "jsonData->'coord'->>'lon' = :lon AND jsonData->'coord'->>'lat' = :lat",
          { lon, lat },
        )
        .getOne();
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }
}
