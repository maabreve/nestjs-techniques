import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as helmet from 'helmet';
import * as fastifyRateLimit from 'fastify-rate-limit';
// import * as rateLimit from 'express-rate-limit'; // Express rate limit

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

    // Cors
    .enableCors();


  // Fastify
  await app.listen(3000, '0.0.0.0');

  // Express
  // await app.listen(3000);
}
bootstrap();
