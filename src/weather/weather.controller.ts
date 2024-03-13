import { Controller, Get, Post } from '@nestjs/common';

@Controller('/weather')
export class WeatherController {
  @Get('/dirname')
  getDirName() {
    console.log(__dirname + '/../**/*.entity{.ts,.js}');
  }

  @Post('/save-weather')
  saveWeather() {}

  @Get('/get-weather')
  getWeather() {}
}
