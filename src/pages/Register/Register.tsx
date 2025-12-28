import React from 'react';
import styles from './Register.module.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '../../shared/config';
import { registerUser, googleLogin } from '../../features/auth/authService';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import ErrorMessage from '../../shared/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Stats from '../../widgets/Stat/Stats';
import { RegisterRequestDto, AuthResponseDTO } from '../../entities/models';

const Register: React.FC = () => {
    const [saving, setSaving] = React.useState(false);
  const registerSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    firstName: yup.string().required('First name is required').min(3, 'First name must be at least 3 characters'),
    lastName: yup.string().required('Last name is required').min(3, 'Last name must be at least 3 characters'),
    username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    phoneNumber: yup.string().required('Phone number is required').min(6, 'Phone number must be at least 6 characters'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterRequestDto>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterRequestDto> = async (registerRequest) => {
    setSaving(true);
    try {
      const res = await registerUser(registerRequest);
      const data: AuthResponseDTO = res.data;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      window.location.href = '/';
    } catch (err: any) {
      // handle error (možeš dodati prikaz poruke)
    } finally {
      setSaving(false);
    }
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
    <Container fluid>
      <Row>
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
              <h2 className={styles.titleText}>Welcome!</h2>
              <span className={styles.subtitleText}>Register to continue your search</span>
            </div>
            <Form className="mt-4">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className={`form-control-text ${errors.email ? 'errorInput' : ''}`}
                  type="email"
                  placeholder="Enter email"
                  {...register('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                ></Form.Control>
                <ErrorMessage message={errors.email?.message} />
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
              <Form.Group className="mt-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className={`form-control-text ${errors.firstName ? 'errorInput' : ''}`}
                  type="text"
                  placeholder="Enter first name"
                  {...register('firstName')}
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                ></Form.Control>
                <ErrorMessage message={errors.firstName?.message} />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className={`form-control-text ${errors.lastName ? 'errorInput' : ''}`}
                  type="text"
                  placeholder="Enter last name"
                  {...register('lastName')}
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                ></Form.Control>
                <ErrorMessage message={errors.lastName?.message} />
              </Form.Group>
              <Form.Group className="mt-3">
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
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  className={`form-control-text ${errors.phoneNumber ? 'errorInput' : ''}`}
                  type="text"
                  placeholder="Enter phone number"
                  {...register('phoneNumber')}
                  aria-invalid={errors.phoneNumber ? 'true' : 'false'}
                ></Form.Control>
                <ErrorMessage message={errors.phoneNumber?.message} />
              </Form.Group>
              <Button className={styles.loginButton} type="submit" onClick={handleSubmit(onSubmit)} disabled={saving}>
                {saving ? 'Saving...' : 'Register'}
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
              <span>Already have an account? </span>
              <Link to="/login" className={styles.registerLink}>
                Login
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

export default Register;
