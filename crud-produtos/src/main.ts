import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração global do ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        // Formatar os erros antes de lançar a exceção
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints),
        }));

        return new BadRequestException({
          data: [],
          error: true,
          code: 400,
          message: 'Erro de validação',
          errors: formattedErrors,
        });
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(3000);
}
bootstrap();
