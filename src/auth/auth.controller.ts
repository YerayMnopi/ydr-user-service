import { Controller, Post, Body, BadRequestException, Logger } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LoginPayload } from './dtos/login-payload';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('auth')
  async login(@Body() loginPayload: LoginPayload) {
    if (loginPayload && loginPayload.email && loginPayload.password) {
      this.logger.log(`Checking ${loginPayload.email} password`);
      const user = await this.authService.validateUser(loginPayload.email, loginPayload.password);
      
      if (user) {
        return this.authService.login(user as User);
      }

      this.logger.log(`User ${loginPayload.email} not validated`);
    }

    throw new BadRequestException();
  }

}
