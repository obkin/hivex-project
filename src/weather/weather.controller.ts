/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { LoggerService } from 'src/logger/logger.service';
import { SaveWeatherDto } from './dto/weather-save.dto';

@Controller('/weather')
export class WeatherController {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly weatherService: WeatherService,
  ) {}

  @Post('/save-weather')
  @UsePipes(new ValidationPipe())
  async saveWeather(@Body() saveWeatherDto: SaveWeatherDto) {
    try {
      return await this.weatherService.saveWeatherData(saveWeatherDto);
    } catch (e) {
      throw new HttpException('Failed to save weather data', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/get-weather')
  async getWeather() {
    try {
      // ...
    } catch (e) {
      // ...
    }
  }
}
