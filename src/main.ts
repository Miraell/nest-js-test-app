import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const hbs = require('hbs');

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.registerHelper('dateToString', function (date: number) {
    return new Date(date).toLocaleDateString('ru');
  });

  await app.listen(3000);
}
bootstrap();
