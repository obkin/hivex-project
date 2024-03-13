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
      const res = await this.weatherService.saveWeatherData(saveWeatherDto);
      if (res) {
        this.loggerService.log(`[WeatherController]: weather saved`);
        return res;
      } else {
        throw new HttpException(
          'Failed to save weather data',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      this.loggerService.error(`[WeatherController] error: ${e.message}`);
      throw new HttpException(
        'Failed to save weather data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
