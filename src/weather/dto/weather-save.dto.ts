import { IsNumber } from 'class-validator';

export class WeatherSaveDto {
  @IsNumber()
  sunrise: number;

  @IsNumber()
  sunset: number;

  @IsNumber()
  temp: number;

  @IsNumber()
  feels_like: number;

  @IsNumber()
  pressure: number;

  @IsNumber()
  humidity: number;

  @IsNumber()
  uvi: number;

  @IsNumber()
  wind_speed: number;
}
