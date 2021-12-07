import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';

import { Form, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { setAuthedUser } from './../actions/authedUser';


function Login1(props) {

    /* const [id, setId] = useState(null)
    const [authedUser, setAutheduser] = useState(false) */

    const [object, setObject] = useState({
        id: null,
        authed: false,
        });

    const navigate = useNavigate()
    const { state } = useLocation()

    const { users, names, user } = props;

    const handleSelectUser = e => {
        e.preventDefault()
        setObject((prevState) => {
            return {
                ...prevState,
                id: e.target.value,
            }
            
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch } = props
        const { id } = useState

        dispatch(setAuthedUser(id))
        setObject((prevState) => {
            return {
                ...prevState,
                authed: true,
            }
        })
        .then(() => { navigate(state?.path || "/dashboard") })
    }

    return (
        <div>
                <Card style={{width: '400px', margin: '0 auto', textAlign: 'center'}} className='p-3'>
                    <h4>Welcome to Would You Rather Game</h4>
                    <p>Please Login to continue</p>
                    <img src={'react.png'} alt='logo' style={{height: '200px'}}/>
                    <h6>Select Username</h6>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Select 
                            aria-label="Floating label select example" 
                            onChange={(e) => handleSelectUser(e)}
                            value={user}
                            >
                                <option value='-1' disabled>select user</option>
                                {names.map((user) => (
                                    
                                    <option key={users[user].id} value={users[user].id}>{users[user].name}</option>
                                ))}
                            </Form.Select>
                            <button className='btn-primary m-3' type='submit' >Login</button>
                        </Form>
                </Card>
            </div>
    )

}

function mapStateToProps ({ users }) {
    return {
        names: Object.keys(users),
        users
    }
}

export default connect(mapStateToProps)(Login1)