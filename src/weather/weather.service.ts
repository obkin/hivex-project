import { Injectable } from '@nestjs/common';
import { WeatherRepository } from './weather.repository';
import { WeatherForecastDto } from './dto/weather-forecast.dto';
import { LoggerService } from 'src/logger/logger.service';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class WeatherService {
  lat: number;
  lon: number;
  part: number;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly weatherRepository: WeatherRepository,
  ) {}

  async getAndSaveForecastFromOpenWeather({ lat, lon, part }) {
    try {
      const forecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat,
            lon,
            part,
            appid: process.env.API_KEY,
          },
        },
      );
      if (forecast) {
        return this.saveWeather(forecast);
      }
    } catch (e) {
      this.loggerService.error(`[WeatherService] error: ${e.message}`);
    }
  }

  async saveWeather(weatherResponse: AxiosResponse<WeatherForecastDto>) {
    try {
      const weatherData: WeatherForecastDto = weatherResponse.data;
      return await this.weatherRepository.saveWeather(weatherData);
    } catch (e) {
      this.loggerService.error(`[WeatherService] error: ${e.message}`);
    }
  }

  // async getWeatherData(getWeatherDto: GetWeatherDto) {
  //   try {
  //     const weather = await this.weatherRepository.getWeather();
  //   } catch (e) {
  //     this.loggerService.error(`[WeatherService] error: ${e.message}`);
  //   }
  // }
}
