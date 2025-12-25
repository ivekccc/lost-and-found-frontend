// DTO za login/register response, paralelan backend modelu
export interface AuthResponseDTO {
  token: string;
  refreshToken: string;
  message?: string;
}
