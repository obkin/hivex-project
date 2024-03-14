import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log(data);
        return {
          sunrise: data.jsonData.sys.sunrise,
          sunset: data.jsonData.sys.sunset,
          temp: data.jsonData.main.temp,
          feels_like: data.jsonData.main.feels_like,
          pressure: data.jsonData.main.pressure,
          humidity: data.jsonData.main.humidity,
          //   uvi: data.uvi,
          wind_speed: data.jsonData.wind.speed,
        };
      }),
    );
  }
}
