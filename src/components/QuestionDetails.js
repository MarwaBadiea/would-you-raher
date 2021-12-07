import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import UnansweredQ from './UnansweredQ';
import AnsweredQ from './AnsweredQ';


function QuestionDetails (props) {

        const { authedAnswers } = props
    
        const { id } = useParams()
        

        const answered = authedAnswers.hasOwnProperty(id) ? true : false
        console.log(id)
        return (
            <div>
                {answered ? <AnsweredQ id={id}/>
                        : <UnansweredQ id={id}/>}
            </div>
        );
    }

function mapStateToProps ({ users, authedUser } ) {
    const authedAnswers = users[authedUser].answers

    return {
        authedAnswers,
        
    }
} 

export default connect(mapStateToProps)(QuestionDetails);