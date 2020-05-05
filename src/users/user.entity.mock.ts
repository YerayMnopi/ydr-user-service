import { MockType } from 'ydr-nest-common';
import { JwtService } from '@nestjs/jwt';

export const jwtServiceMockFactory: () => MockType<JwtService> = jest.fn(() => ({
    sign: jest.fn(),
   }));