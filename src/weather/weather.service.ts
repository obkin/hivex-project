import { Injectable } from '@nestjs/common';
import { SaveWeatherDto } from './dto/weather-save.dto';
import { WeatherRepository } from './weather.repository';
import { WeatherForecastDto } from './dto/weather-forecast.dto';
import { LoggerService } from 'src/logger/logger.service';

const mockOpenWatherData: WeatherForecastDto = {
  sunrise: 10,
  sunset: 11,
  temp: 12,
  feels_like: 10,
  pressure: 11,
  humidity: 12,
  uvi: 10,
  wind_speed: 11,
};

@Injectable()
export class WeatherService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly weatherRepository: WeatherRepository,
  ) {}

  async saveWeatherData(saveWeatherDto: SaveWeatherDto) {
    try {
      if (saveWeatherDto) {
        return await this.weatherRepository.saveWeather(mockOpenWatherData);
      }
    } catch (e) {
      this.loggerService.error(`[WeatherService] error: ${e.message}`);
    }
  }

  async getWeatherData() {}
}
