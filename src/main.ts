import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

ConfigModule.forRoot();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:2310',
      'http://localhost',
    ],
  });

  const options = new DocumentBuilder()
    .setTitle('Simple-test')
    .setDescription('Development interface')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // test
  await app.listen(process.env.API_PORT);
}
bootstrap().then(() =>
  console.log(`http://localhost:${process.env.API_PORT}/swagger`),
);
