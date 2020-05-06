import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as helmet from 'helmet';
import * as fastifyRateLimit from 'fastify-rate-limit';
// import * as rateLimit from 'express-rate-limit'; // Express rate limit
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as swStats from 'swagger-stats';
import { apiSpec } from './swagger';
import * as compression from 'compression';

// Enable swagger-stats middleware in express app, passing swagger spe
async function bootstrap() {

  // Fastify
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // Express
  // const app = await NestFactory.create(AppModule);

  app
    // Helmet
    .use(helmet())

    // Fastify rate limit
    .use(fastifyRateLimit, {
      max: 25,
      timeWindow: '1 minute'
    })

    // Express rate limit
    // .use(
    //   rateLimit({
    //     windowMs: 15 * 60 * 1000, // 15 minutes
    //     max: 100, // limit each IP to 100 requests per windowMs
    //   })
    // )

    // swagger statistics
    .use(swStats.getMiddleware({ swaggerSpec: apiSpec }))

    // compression
    .use(compression())

    // Cors
    .enableCors();
  console.log(`---xxx`, swStats);

  const options = new DocumentBuilder()
    .setTitle('Nest boilerplate')
    .setDescription('NestJs API description')
    .setVersion('1.0')
    .addTag('nestJs')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  // Fastify
  await app.listen(3000, '0.0.0.0');

  // Express
  // await app.listen(3000);
}
bootstrap();
