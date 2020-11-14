import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LoginPayload } from 'src/auth/dtos/login-payload';
import { LoginResponse } from 'src/auth/dtos/login-response';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';
import { Repository } from 'typeorm';
import { User } from '../src/users/user.entity';
import { userMockFactory } from '../src/users/user.mock';
import { UserCreatePayload } from 'src/users/user-create.payload';
import { ConfigModule } from '@nestjs/config';
import { ormE2eConfig } from 'ydr-nest-common';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<User>;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync(ormE2eConfig),
        AuthModule, 
        UsersModule,
      ]}).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = moduleFixture.get('UserRepository');
  });

  describe('login (/auth)', () => {
    const endpoint = '/auth';
    let loginPayload: LoginPayload;
    let user: UserCreatePayload;

    beforeEach(async() => {
      user = userMockFactory();
      loginPayload = {
        email: user.email,
        password: user.password
      };
      await repository.save(user);
    });

    it('400 if not body', () => {
      return request(app.getHttpServer()).post(endpoint).expect(400);
    });

    it('400 if not email', () => {
      loginPayload.email = null;
      return request(app.getHttpServer()).post(endpoint).send(loginPayload).expect(400);
    });

    it('400 if not passwd', () => {
      loginPayload.password = null;
      return request(app.getHttpServer()).post(endpoint).send(loginPayload).expect(400);
    });
    
    it('400 if not found', () => {
      loginPayload.email = 'another@email.com';
      return request(app.getHttpServer()).post(endpoint).send(loginPayload).expect(400);
    });

    it('400 if wrong password', () => {
      loginPayload.email = 'wrong password';
      return request(app.getHttpServer()).post(endpoint).send(loginPayload).expect(400);
    });

    it('201', async() => {
      return request(app.getHttpServer()).post(endpoint).send(loginPayload)
        .expect(201);
    });

  });

  describe('POST /users', () => {
    const endpoint = '/users';
    let user: UserCreatePayload;

    beforeEach(async() => {
      user = userMockFactory();
    });

    it('should create a new user', () => {
      return request(app.getHttpServer()).post(endpoint).send(user)
        .expect(201);
    });
  });

  describe('GET /users', () => {
    const adminUser = userMockFactory();
    let authResponse: {body: LoginResponse};

    beforeEach(async(done) => {
      await repository.save([
        adminUser,
        userMockFactory(),
        userMockFactory(),
      ]);
      request(app.getHttpServer())
        .post('/auth')
        .send({email: adminUser.email, password: adminUser.password})
        .end((err, response) => {
          authResponse = response;
          done();
        });
    });

    it('should return Unauthorized', async () => {
      await request.agent(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it('should return an array of users', async () => {
      const response: {body: User[]} = await request.agent(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authResponse.body.accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(response.body.length).toBe(3);
    });
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM users;`);
  });

  afterAll(async () => {
    await app.close();
  });
});
