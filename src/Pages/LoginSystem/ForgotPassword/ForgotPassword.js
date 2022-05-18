import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase/Firebase.init';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

    const resetPassword = async event => {
        event.preventDefault();
        const email = event.target.email.value;
        if (email) {
            await sendPasswordResetEmail(email);
            event.target.reset();
            toast.success('Email Send!')
        }
        else {
            toast.error("Please enter email address!")
        }
    }
    return (
        <div className='form-area login-area text-center d-flex justify-content-center align-items-center'>
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <div className="form-main">
                            <div className="form-area-text mb-4">
                                <h3 className='theme-text-primary text-center '>Forgot Password?</h3>
                                <h4 className='theme-sub-text mt-3'>Please put your email address and click submit.</h4>
                            </div>
                            <form onSubmit={resetPassword}>
                                <Form.Control name="email" type="email" placeholder="Email Address" className='mb-3' required />
                                <div className="form-mata d-flex justify-content-between">
                                    <p>Back to login: <Link to="/login">Login</Link></p>
                                </div>
                                <Button className='btn theme-btn-two w-100' type="submit">
                                    Reset Password
                                </Button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ForgotPassword;