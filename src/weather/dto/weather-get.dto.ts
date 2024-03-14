import { IsIn, IsNumber } from 'class-validator';

enum WeatherPart {
  CURRENT = 'current',
  MINUTELY = 'minutely',
  HOURLY = 'hourly',
  DAILY = 'daily',
  ALERTS = 'alerts',
}

export class GetWeatherDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;

  @IsIn(Object.values(WeatherPart))
  part: string;
}
