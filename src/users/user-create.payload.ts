import { UserResponse } from './user-response';

export interface UserCreatePayload extends UserResponse {
    password: string;
}