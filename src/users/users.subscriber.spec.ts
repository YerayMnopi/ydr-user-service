import {
    Connection,
  } from 'typeorm';
import { UserSubscriber } from './users.subscriber';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserSubscriber', () => {
    let subscriber: UserSubscriber;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            UserSubscriber,
            { provide: Connection, useValue : {subscribers: []} }
        ],
      }).compile();
  
      subscriber = module.get<UserSubscriber>(UserSubscriber);
  
    });
  
    
    it('should be defined', () => {
      expect(subscriber).toBeDefined();
    });


    // it('should send inserted user to kafka', () => {});
});