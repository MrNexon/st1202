import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  /*const config = new DocumentBuilder()
    .setTitle('ST1202')
    .setDescription('API for ST1202')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);*/

  app.setGlobalPrefix('/api');

  await app.listen(3000);
}
bootstrap();