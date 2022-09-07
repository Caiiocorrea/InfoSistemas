import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Collection')
    .setDescription('InfoSistemas REST API.')
    .setTermsOfService('https://www.infosistemas.com.br')
    .setContact('Collection', 'https://www.infosistemas.com.br/', 'contato@infosistemas.com.br')
    .setVersion('1.0')
    .addBearerAuth({
      description: `[apenas texto] Insira o token no seguinte formato: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    },
      'access-token'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  await app.listen(3008);
}
bootstrap();
