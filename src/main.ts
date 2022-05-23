import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, 
    logger: ['log', 'error', 'warn', 'debug','verbose'] 
  });

  const options = new DocumentBuilder()
    .setTitle('YDR users service')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  await app.listen(process.env['APP_PORT']);
}
bootstrap();
