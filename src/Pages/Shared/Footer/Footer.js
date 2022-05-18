import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className='bg-light py-3 text-center'>
            <Container>
                <p className='m-0'>&copy; ToDo App 2022, All Rights Reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;