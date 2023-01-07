import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { UserInterface } from 'shared.types/interfaces';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('register')
  async register(user: UserInterface) {
    await this.appService.create(user);
  }

  @MessagePattern('login')
  async login(email: string, password: string) {
    return await this.appService.find(email, password);
  }
}
