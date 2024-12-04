import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para uma origem específica (exemplo: frontend no localhost:3002)
  app.enableCors({
    origin: 'http://localhost:3002', // Permite apenas essa origem
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept, Authorization', // Cabeçalhos permitidos
  });

  await app.listen(3000);
}
bootstrap();
