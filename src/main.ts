import { NestFactory , HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule) //,//{
 //   bufferLogs: true, //les journaux générés pendant le démarrage de l'application seront d'abord stockés dans le tampon (bufferLogs), puis émis dans l'ordre une fois l'initialisation terminée. Ces journaux peuvent être interceptés et enregistrés dans un fichier par la méthode logToFile de MyLoggerService.
 // });
  // app.useLogger(app.get(MyLoggerService));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap(); 


//Dans bootstrap(), le filtre d'exceptions AllExceptionsFilter est ajouté comme filtre global à l'application en utilisant app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)). Cela signifie que ce filtre sera appliqué à toutes les requêtes HTTP de l'application.
