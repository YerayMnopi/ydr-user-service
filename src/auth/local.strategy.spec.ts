import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { MockType } from 'ydr-nest-common';
jest.mock('./auth.service');

export const authServiceMockFactory: () => MockType<AuthService> = jest.fn(() => ({
  validateUser: jest.fn(),
  login: jest.fn(),
 }));

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authServiceMock: MockType<AuthService>;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    authServiceMock = authServiceMockFactory();
    // @ts-ignore
    localStrategy = new LocalStrategy(authServiceMock)
  });

  it('should create an instance', () => {
    expect(localStrategy).toBeTruthy();
  });
});
