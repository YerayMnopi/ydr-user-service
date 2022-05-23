import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from '../users/user-response';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async validateUser(email: string, pass: string): Promise<UserResponse | null> {
    this.logger.log(`Validating ${email} user`);
    const user = await this.usersService.checkCredentials(email, pass);
    return !!user ? user : null;
  }

  async login(user: User) {
    delete user.password;
    const payload = { sub: user.id, ...user };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
