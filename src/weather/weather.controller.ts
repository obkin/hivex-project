import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
      const savedData =
        await this.weatherService.getAndSaveForecastFromOpenWeather(
          saveWeatherDto,
        );
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
  @UsePipes(new ValidationPipe())
  @UseInterceptors(TransformInterceptor)
  async getWeather(@Query() params: GetWeatherDto) {
    try {
      const weatherData = await this.weatherService.getWeatherData(params);
      if (weatherData) {
        this.loggerService.log(`[WeatherController]: weather data sent`);
        return weatherData;
      } else {
        throw new HttpException(
          'Failed to get weather data',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (e) {
      this.loggerService.error(`[WeatherController] error: ${e.message}`);
      throw new HttpException(
        'Failed to get weather data',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
