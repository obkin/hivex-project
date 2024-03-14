import { Injectable } from '@nestjs/common';
import { SaveWeatherDto } from './dto/weather-save.dto';
import { WeatherRepository } from './weather.repository';
import { WeatherForecastDto } from './dto/weather-forecast.dto';
import { LoggerService } from 'src/logger/logger.service';
import axios, { AxiosResponse } from 'axios';
import { GetWeatherDto } from './dto/weather-get.dto';

@Injectable()
export class WeatherService {
  lat: number;
  lon: number;
  part: number;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly weatherRepository: WeatherRepository,
  ) {}

  async saveWeather(weatherResponse: AxiosResponse<WeatherForecastDto>) {
    try {
      const weatherData: WeatherForecastDto = weatherResponse.data;
      return await this.weatherRepository.saveWeather(weatherData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async saveWeatherData(weatherResponse: AxiosResponse<WeatherForecastDto>) {
    try {
      // const coords = {
      //   lat: saveWeatherDto.lat,
      //   lon: saveWeatherDto.lon,
      //   part: saveWeatherDto.part,
      // };
      // const weather = await this.getForecastFromOpenWeather();
      // if (weather) {
      //   console.log(weather);
      //   return await this.weatherRepository.saveWeather(weather);
      // }
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
}
