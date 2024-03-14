import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { LoggerService } from 'src/logger/logger.service';
import { SaveWeatherDto } from './dto/weather-save.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { GetWeatherDto } from './dto/weather-get.dto';

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
      // eslint-disable-next-line prettier/prettier
      const savedData = await this.weatherService.getAndSaveForecastFromOpenWeather(saveWeatherDto);
      if (savedData) {
        this.loggerService.log(`[WeatherController]: weather saved`);
        return savedData;
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
  @UseInterceptors(TransformInterceptor)
  @UsePipes(new ValidationPipe())
  async getWeather(@Query() params: GetWeatherDto) {
    try {
      const weatherData = await this.weatherService.getWeatherData(params);
      console.log(weatherData);
      console.log(params);
      if (weatherData) {
        this.loggerService.log(`[WeatherController]: weather data sent`);
        return weatherData;
      } else {
        throw new HttpException(
          'Failed to get weather data',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      this.loggerService.error(`[WeatherController] error: ${e.message}`);
      throw new HttpException(
        'Failed to get weather data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
