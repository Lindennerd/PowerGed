import { MongooseModule } from '@nestjs/mongoose';

export const mongoConnection = MongooseModule.forRoot(
  'mongodb://172.17.0.4:27017/powerged_auth?directConnection=true&retryWrites=true&w=majority',
);
