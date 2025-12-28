// DTO za register request, paralelan backend modelu
export interface RegisterRequestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
}
// DTO za login/register request, paralelan backend modelu
export interface AuthRequestDTO {
  email: string;
  password: string;
}

// DTO za login/register response, paralelan backend modelu
export interface AuthResponseDTO {
  token: string;
  refreshToken: string;
  message?: string;
}
