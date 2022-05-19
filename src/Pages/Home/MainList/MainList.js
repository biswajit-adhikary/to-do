import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase/Firebase.init';
import './MainList.css'
import toast from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import axiosApi from '../../../api/axiosApi';
import { useNavigate } from 'react-router-dom';

const MainList = () => {
    // Importent Variables
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    // Get List
    const [lists, setLists] = useState([]);
    useEffect(() => {
        const getItem = async () => {
            const email = user?.email;
            const url = `http://localhost:5000/task-list?email=${email}`;
            try {
                const { data } = await axiosApi.get(url);
                setLists(data);
            } catch (error) {
                console.log(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getItem();
    }, [user, navigate, lists]);

    // Add List
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, event) => {
        const url = `http://localhost:5000/list`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                toast.success('Task Added!')
                event.target.reset();
            })
    };

    // Delete List
    const handelItemDelete = id => {
        const agree = window.confirm('Are you want to delete this item?');
        if (agree) {
            const url = `http://localhost:5000/list/${id}`;
            console.log(url);
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    const remainingItem = lists.filter(item => item._id !== id);
                    setLists(remainingItem);
                    toast.success('Item Deleted!')
                })
        }
    }

    // Completed list
    const handelItemCompleted = (id) => {
        const agree = window.confirm('This task completed?');
        const status = {};
        if (agree) {
            const url = `http://localhost:5000/lists/${id}`;
            console.log(url);
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(status)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success("Completed Successfully!")
                })
        }
    }


    return (
        <div className='main-list-area'>
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <div className="main-list-header bg-light">
                            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                                <input className='form-control' placeholder='Task Name' type="text" {...register("name")} required />
                                <textarea className='form-control mt-2' placeholder='Task Description' {...register("description")} required />
                                <input className='form-control mt-2' placeholder='Email' type="hidden" value={user.email} {...register("email")} readOnly />
                                <input className='form-control mt-2' placeholder='Status' value={0} type="hidden" {...register("status")} readOnly />
                                <input type="submit" className='btn btn-outline-secondary mt-2 active' value="Add Task" />
                            </form>
                        </div>
                        {/* <div className="main-list-body my-4">
                            {
                                lists.map(list => <Task
                                    key={list._id}
                                    list={list}
                                ></Task>)
                            }
                        </div> */}
                        <div className="main-list-body my-4">
                            {
                                lists.map(list => <div key={list._id} className='single-list bg-light'>
                                    <div className="task-details">
                                        <h3>{list.name}</h3>
                                        <p>{list.description}</p>
                                    </div>
                                    <div className="task-action">
                                        <Button onClick={() => handelItemCompleted(list._id)} variant="success" size="sm">
                                            Completed
                                        </Button>
                                        <Button onClick={() => handelItemDelete(list._id)} variant="warning" size="sm">
                                            Delete
                                        </Button>
                                    </div>
                                </div>)
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainList;