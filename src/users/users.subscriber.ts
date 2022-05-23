import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { User } from './user.entity';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    constructor(
        connection: Connection,
        @Inject('KAFKA_CLIENT') private readonly client: ClientKafka 
    ) {
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