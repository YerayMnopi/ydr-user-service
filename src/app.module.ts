import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EasyconfigModule } from  'nestjs-easyconfig';

@Module({
  imports: [
    EasyconfigModule.register({path: '.env'}),
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule
  ],
})
export class AppModule {}
