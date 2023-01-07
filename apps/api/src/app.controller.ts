import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserInterface } from 'shared.types/interfaces';

@Controller()
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Post('/user/register')
  register(@Body() User: UserInterface) {
    console.log(User);
    this.client.emit<UserInterface>('register', User);
  }
}
