import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true,
  });
  app.enableCors();
  const PORT = Number(process.env.PORT) || 4242;
  await app.listen(PORT);

  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}

bootstrap();
