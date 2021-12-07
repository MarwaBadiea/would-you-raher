import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Form, Card, Button, Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { handleAnswerQuestion } from '../actions/questions';


class UnansweredQ extends React.Component {
    state = {
        authedAnswer: ''
    }

    handleAnswer = (e) => {
        e.preventDefault()

        const{ dispatch, authedUser, id } = this.props
        const authedAnswer = this.state

        if (authedAnswer !== '') {
            dispatch(handleAnswerQuestion({
                qid:id,
                answer: authedAnswer,
                authedUser}))
        }
    }

    changeAnswer (answer) {
        this.setState((prevState) => {
            return { authedAnswer: answer }
        })
    }

    render() { 
        const { authedAnswer } = this.state
        const { author, question } = this.props

        if (!question) {
            return <Navigate to={'/notfound'}/>
        }

        return (
            <Card style={{width: '400px', margin: '0 auto', textAlign: 'center'}}>
                
                <Card.Text className='d-flex' style={{backgroundColor: '#E7EAED'}} >
                    <Image style={{width: '60px', backgroundColor: 'transparent'}} roundedCircle src={author.avatarURL} />
                    <Card.Header as="h5" style={{backgroundColor: 'transparent'}}>{author.name} Asks</Card.Header>
                </Card.Text>
                <Card.Title>Would You Rather...</Card.Title>
                <Form onSubmit={(e) => this.handleAnswer(e)} >
                
                <Form.Group className="mb-3">
                    <Form.Check
                    type="radio"
                    label={question.optionOne.text}
                    name="answer"
                    value='optionOneText'
                    id="optionOne"
                    onClick={(e) => {this.changeAnswer('optionOne')}}
                    />
                    <Form.Check
                    type="radio"
                    label={question.optionTwo.text}
                    name="answer"
                    value='optionTwoText'
                    id="optionTwo"
                    onClick={(e) => {this.changeAnswer('optionTwo')}}
                    />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        
                        <Button type="submit">Submit Answer</Button>
                    
                    </Form.Group>
                </Form>
                </Card>
        );
    }
}

function mapStateToProps ({ questions, users, authedUser }, { id }) {
    const question = questions[id]
    const author = question ? users[question.author] : null

    return {
        question,
        author,
        authedUser
    }
}

export default connect(mapStateToProps)(UnansweredQ);