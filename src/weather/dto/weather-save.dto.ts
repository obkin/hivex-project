import { IsNumber } from 'class-validator';

export class SaveWeatherDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;

  @IsNumber()
  part: number;
}
