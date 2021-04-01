import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UserSubscriber } from './users.subscriber';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport, ClientsProviderAsyncOptions } from '@nestjs/microservices';

const kafkaClientConfig: ClientsProviderAsyncOptions = {
  name: 'KAFKA_CLIENT',
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'users',
        brokers: [configService.get('KAFKA_HOST')],
      }, consumer: {
          groupId: 'users-consumer'
      },
      subscribe: {
          fromBeginning: true
      }
    }
  }),
  inject: [ConfigService]
}

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.registerAsync([kafkaClientConfig])
  ],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber],
  exports: [UsersService]
})
export class UsersModule {}
