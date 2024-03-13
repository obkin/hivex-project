import { IsNumber } from 'class-validator';

export class WeatherForecastDto {
  @IsNumber()
  sunrise;

  @IsNumber()
  sunset;

  @IsNumber()
  temp;

  @IsNumber()
  feels_like;

  @IsNumber()
  pressure;

  @IsNumber()
  humidity;

  @IsNumber()
  uvi;

  @IsNumber()
  wind_speed;
}
