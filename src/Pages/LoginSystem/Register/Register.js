import React, { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../Firebase/Firebase.init';
import useToken from '../../../hooks/useToken';
import Loading from '../../Shared/Loading/Loading';
import GoogleLogin from '../GoogleLogin/GoogleLogin';

const Register = () => {
    // Main hook(Registration) and send email verification
    const [
        createUserWithEmailAndPassword,
        emailUser,
        emailLoading,
        emailError,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [token] = useToken(emailUser);

    // Profile update
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    // Registration function
    const handleEmailRegister = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
    }

    // Important Variable
    let errorMessage;
    const navigate = useNavigate();

    // Successfully Register
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [navigate, token]);

    // Loading & Updating
    if (emailLoading || updating) {
        return <Loading></Loading>;
    }

    // Error Message
    if (emailError || updateError) {
        errorMessage = <p className='text-danger mt-3'>Error: {emailError?.message}</p>;
    }

    return (
        <div className='form-area login-area text-center d-flex justify-content-center align-items-center'>
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <div className="form-main">
                            <div className="form-area-text mb-4">
                                <h3 className='theme-text-primary text-center '>Register</h3>
                                <h4 className='theme-sub-text mt-3'>Please Register to continue using our website.</h4>
                            </div>
                            <form onSubmit={handleEmailRegister}>
                                <Form.Control name="name" type="text" placeholder="Full Name" className='mb-3' required />
                                <Form.Control name="email" type="email" placeholder="Email Address" className='mb-3' required />
                                <Form.Control name="password" type="password" placeholder="Password" className='mb-3' required />
                                <div className="form-mata d-flex justify-content-between">
                                    <p>Already have an account? <Link to="/login">Login</Link></p>
                                </div>
                                <Button className='w-100' type="submit" variant="success">
                                    Register
                                </Button>
                                {errorMessage}
                                <div className="separator">
                                    <div></div>
                                    <span>Or</span>
                                    <div></div>
                                </div>
                                <GoogleLogin></GoogleLogin>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;