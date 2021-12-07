import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { Form, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { setAuthedUser } from './../actions/authedUser';


class Login extends React.Component {
    state = {
        id: null,
        authedUser: false 
    }

    

    handleSelectUser = function(e) {
        const id = e.target.value

        this.setState(function(previousState) {
            return {
                ...previousState,
                id,
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        const { id } = this.state
        

        dispatch(setAuthedUser(id))

        this.setState(function(previousState) {
            return {
                ...previousState,
                authedUser: true
            }
        })
    }


    render() { 
        const { users, names, user } = this.props;
        const { authedUser } = this.state
        const { from } = this.props.location || { from: { pathname: '/dashboard'}}
        
        if (authedUser) {
            return <Navigate to={from} />
        }
        

        return (
            <div>
                <Card style={{width: '400px', margin: '0 auto', textAlign: 'center'}} className='p-3'>
                    <h4>Welcome to Would You Rather Game</h4>
                    <p>Please Login to continue</p>
                    <img src={'react.png'} alt='logo' style={{height: '200px'}}/>
                    <h6>Select Username</h6>
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                            <Form.Select 
                            aria-label="Floating label select example" 
                            onChange={(e) => this.handleSelectUser(e)}
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
            );
    }
}

function mapStateToProps ({ users }) {
    return {
        names: Object.keys(users),
        users
    }
}

export default connect(mapStateToProps)(Login);