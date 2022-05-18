import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../Firebase/Firebase.init';
import useToken from '../../../hooks/useToken';
import google from '../../../images/google.png'
import Loading from '../../Shared/Loading/Loading';


const GoogleLogin = () => {
    // Main hook(Google Login)
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const [token] = useToken(googleUser);

    // Important Variable
    const navigate = useNavigate();
    let errorMessage;
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    // Successfully login
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        };
    }, [from, navigate, token]);

    // Loading
    if (googleLoading) {
        return <Loading></Loading>;
    };

    // Error Message
    if (googleError) {
        errorMessage = <p className='text-danger mt-3'>Error: {googleError?.message}</p>
    };

    return (
        <div className='google-login'>
            <Button onClick={() => signInWithGoogle()} className='w-100' variant="outline-secondary" type="submit">
                <img src={google} alt="" /> Continue With Google
            </Button>
            {errorMessage}
        </div>
    );
};

export default GoogleLogin;