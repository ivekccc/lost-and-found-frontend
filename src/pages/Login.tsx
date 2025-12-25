import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '../shared/config';
import { login, googleLogin } from '../features/auth/authService';
import { AuthRequestDTO } from '../entities/AuthRequestDTO';
import { AuthResponseDTO } from '../entities/AuthResponseDTO';
import { useForm,SubmitHandler } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import ErrorMessage from '../shared/ErrorMessage';


const Login: React.FC = () => {


  const authRequestSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const { register, formState: { errors }, handleSubmit } = useForm<AuthRequestDTO>({
    resolver: yupResolver(authRequestSchema)
  });

  const onSubmit: SubmitHandler<AuthRequestDTO> = async (authRequest) => await handleLogin(authRequest);



  const handleLogin = async (authRequest: AuthRequestDTO) => {
    try {
      const res = await login(authRequest);
      const data: AuthResponseDTO = res.data;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      window.location.href = '/'; // redirect na home
    } catch (err: any) {
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await googleLogin(credentialResponse.credential);
      const data: AuthResponseDTO = res.data;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      window.location.href = '/';
    } catch (err: any) {
    }
  };

  const handleGoogleError = () => {
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        <h2>Prijava</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control
            type="text"
            placeholder="Username"
            {...register("username")}
            aria-invalid={errors.username ? "true" : "false"}
          />
          <ErrorMessage message={errors.username?.message} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          <ErrorMessage message={errors.password?.message} />
          </Form.Group>
          <Button type="submit">Log In</Button>
        </Form>
        <div style={{ margin: '20px 0' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;


