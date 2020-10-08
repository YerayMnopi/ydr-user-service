import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPayload } from './dtos/login-payload';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('auth')
  async login(@Body() loginPayload: LoginPayload) {
    if (loginPayload && loginPayload.email && loginPayload.password) {
      const user = await this.authService.validateUser(loginPayload.email, loginPayload.password);

      if (user) {
        return await this.authService.login(user);
      }
    }

    throw new BadRequestException();
  }

}
