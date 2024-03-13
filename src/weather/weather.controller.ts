import { Controller, Get, Post } from '@nestjs/common';

@Controller('/weather')
export class WeatherController {
  @Post('/save-weather')
  saveWeather() {}

  @Get('/get-weather')
  getWeather() {}

  @Get('/dirname')
  getDirName() {
    console.log(__dirname + '/../**/*.entity{.ts,.js}');
  }
}
