import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5050;

  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new TransformInterceptor()); // add this thing
  app.enableCors();

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

bootstrap();
