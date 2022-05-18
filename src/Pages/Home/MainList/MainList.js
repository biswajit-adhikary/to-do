import React from 'react';
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import './MainList.css'

const MainList = () => {
    return (
        <div className='main-list-area'>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <div className="main-list-header">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Task Name"
                                    aria-label="Task Name"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    Add Task
                                </Button>
                            </InputGroup>
                        </div>
                        <div className="main-list-body">

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainList;