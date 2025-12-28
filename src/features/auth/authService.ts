import { AuthRequestDTO, RegisterRequestDto } from '../../entities/models';
import http from '../../serivices/http-service';

export async function login(authRequest: AuthRequestDTO) {
  return http.post('/auth/login', authRequest);
}

export async function registerUser(authRequest: RegisterRequestDto) {
  return http.post('/auth/register', authRequest);
}

export async function googleLogin(credential: string) {
  return http.post('/auth/google', { credential });
}
