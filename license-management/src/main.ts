import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger config
  app.setGlobalPrefix('api');
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: false,
      docExpansion: 'none',
    },
    customSiteTitle: 'IFHCRS',
  };
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('LM APIs')
    .setDescription('LM API Documentation')
    .setVersion('1.0')
    .setContact(
      'Tria Trading PLc',
      'http://peragosystems.com/',
      'perago@info.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new JwtAuthGuard(reflector));
  SwaggerModule.setup('/', app, document, customOptions);
  app.enableCors({
    origin: '*',
  });
  await app.listen(3000).then(() => console.log('app is running at port 3000'));
}
bootstrap();
