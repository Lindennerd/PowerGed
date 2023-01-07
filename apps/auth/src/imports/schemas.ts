import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';

export const schemas = MongooseModule.forFeature([
  { name: 'User', schema: UserSchema },
]);
