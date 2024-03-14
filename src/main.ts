import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const PORT = process.env.PORT || 5050;

  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes();
  app.enableCors();

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

bootstrap();
