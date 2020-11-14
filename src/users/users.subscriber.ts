import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
  import { User } from './user.entity';
  import { Client, ClientKafka, Transport } from '@nestjs/microservices';

  @EventSubscriber()
  export class UserSubscriber implements EntitySubscriberInterface<User> {
    
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'users',
                brokers: ['localhost:9092'],
            }, consumer: {
                groupId: 'users-consumer'
            },
            subscribe: {
                fromBeginning: true
            }
        }
    })
    client: ClientKafka;

    constructor(connection: Connection) {
      connection.subscribers.push(this);
    }

    async onModuleInit() {
        this.client.subscribeToResponseOf('ydr-users');
        await this.client.connect();
    }
    
    listenTo() {
      return User;
    }
  
    afterInsert(event: InsertEvent<User>) {
        this.client.send('ydr-users', event.entity).subscribe(
            (value) => console.log(value)
        ); 
    }
  }