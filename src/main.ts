import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  const config = new DocumentBuilder()
    .setTitle('Abrorbek')
    .setDescription("Salom  Hello  Привет   Bonjour   Hallo   Hola   你好   こんにちは   안녕하세요   Merhaba")
    .addBearerAuth()
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
