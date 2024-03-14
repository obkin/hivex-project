import { IsIn, IsString } from 'class-validator';

export enum WeatherPart {
  CURRENT = 'current',
  MINUTELY = 'minutely',
  HOURLY = 'hourly',
  DAILY = 'daily',
  ALERTS = 'alerts',
}

export class GetWeatherDto {
  @IsString()
  lat: string;

  @IsString()
  lon: string;

  @IsIn(Object.values(WeatherPart))
  part: string;
}
