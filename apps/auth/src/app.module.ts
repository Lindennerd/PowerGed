import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './imports/config';
import { mongoConnection } from './imports/mongo.connection';
import { schemas } from './imports/schemas';
import { CryptProvider } from './providers/crypt.provider';

@Module({
  imports: [config, mongoConnection, schemas],
  controllers: [AppController],
  providers: [AppService, CryptProvider],
})
export class AppModule {}
