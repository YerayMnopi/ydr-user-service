import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from '../users/user-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async validateUser(email: string, pass: string): Promise<UserResponse | null> {
    const user = await this.usersService.checkCredentials(email, pass);
    return !!user ? user : null;
  }

  async login(user: UserResponse) {
    const payload = { sub: user.id, ...user };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
