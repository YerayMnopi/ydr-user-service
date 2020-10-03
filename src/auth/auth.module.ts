import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { YdrJwtModule } from 'ydr-nest-common';

@Module({
  imports: [
    UsersModule,
    YdrJwtModule
  ],
  providers: [
    AuthService,
    LocalStrategy,
    ],
  controllers: [AuthController]
})
export class AuthModule {}
