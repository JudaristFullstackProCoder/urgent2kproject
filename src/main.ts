import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const corsAllowedOrigin = configService.get<string>('CORS_ALLOW_ORIGIN');
  const corsAllowedMethods = configService.get<string[]>('CORS_ALLOW_METHODS');
  app.use(cookieParser(configService.get<string>('COOKIE_SECRET'), {}));
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(compression());
  const config = new DocumentBuilder()
    .setTitle("Api envoie d'argent")
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: corsAllowedOrigin,
    methods: corsAllowedMethods,
  })
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
