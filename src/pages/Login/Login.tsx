import React, { useState } from 'react';
import styles from './Login.module.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '../../shared/config';
import { login, googleLogin } from '../../features/auth/authService';
import { AuthRequestDTO } from '../../entities/AuthRequestDTO';
import { AuthResponseDTO } from '../../entities/AuthResponseDTO';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import ErrorMessage from '../../shared/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import Stats from '../../widgets/Stat/Stats';

const Login: React.FC = () => {
  const authRequestSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthRequestDTO>({
    resolver: yupResolver(authRequestSchema),
  });

  const onSubmit: SubmitHandler<AuthRequestDTO> = async (authRequest) =>
    await handleLogin(authRequest);

  const handleLogin = async (authRequest: AuthRequestDTO) => {
    try {
      const res = await login(authRequest);
      const data: AuthResponseDTO = res.data;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      window.location.href = '/'; // redirect na home
    } catch (err: any) {}
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await googleLogin(credentialResponse.credential);
      const data: AuthResponseDTO = res.data;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      window.location.href = '/';
    } catch (err: any) {}
  };

  const handleGoogleError = () => {};

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col className={styles.leftSide}>
          <div className={styles.formContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.titleIcon}>🔍</div>
              <div className={styles.title}>
                <h2 className={styles.titleText}>Lost &amp; Found</h2>
                <span className={styles.subtitleText}>Find or Report</span>
              </div>
            </div>
            <div className="d-flex flex-column mt-4">
              <h2 className={styles.titleText}>Welcome Back!</h2>
              <span className={styles.subtitleText}>Login to continue your search</span>
            </div>
            <Form className="mt-4">
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className={`form-control-text ${errors.username ? 'errorInput' : ''}`}
                  type="text"
                  placeholder="Enter username"
                  {...register('username')}
                  aria-invalid={errors.username ? 'true' : 'false'}
                ></Form.Control>
                <ErrorMessage message={errors.username?.message} />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={`form-control-text ${errors.password ? 'errorInput' : ''}`}
                  type="password"
                  placeholder="Enter password"
                  {...register('password')}
                  aria-invalid={errors.password ? 'true' : 'false'}
                ></Form.Control>
                <ErrorMessage message={errors.password?.message} />
              </Form.Group>
              <Button className={styles.loginButton} type="submit" onClick={handleSubmit(onSubmit)}>
                Log In
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </Form>
            <div className={styles.separatorBlock}>
              <div className={styles.separatorLineContainer}>
                <div className={styles.separatorLine}></div>
              </div>
              <div className={styles.separatorTextContainer}>
                <span className={styles.separatorText}>or continue with</span>
              </div>
            </div>
            <div className="mt-4">
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                />
              </GoogleOAuthProvider>
            </div>
            <div className="mt-4 d-flex justify-content-center align-items-center gap-2">
              <span>Don't have an account? </span>
              <Link to="/register" className={styles.registerLink}>
                Resgister
              </Link>
            </div>

            {/* <Button variant="outline-success" className={styles.googleButton} onClick={() => {}}>
              <FontAwesomeIcon icon={faGoogle} />
              Google
            </Button> */}
          </div>
        </Col>
        <Col className={styles.rightSide}>
          <div className={styles.rightSideContent}>
            <h1 className={styles.titleIcon}>🔍</h1>
            <h1 className={styles.titleText}>Find what you lost</h1>
            <h3 className={styles.subtitleText}>
              Join a community of over 10,000 users who have found their lost items.
            </h3>
            <div className={styles.stats}>
              <Stats value="10,000+" title="Users"></Stats>
              <Stats value="5,000+" title="Items Found"></Stats>
              <Stats value="1,200+" title="Items Reported"></Stats>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
