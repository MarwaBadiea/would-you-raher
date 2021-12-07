import { RECEIVE_USERS } from './../actions/users';
import { ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions';

export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users,
            }

        case ADD_QUESTION :
            {
                const { formattedQuestion } = action.payload;
                const { author, id } = formattedQuestion;
    
                return {
                    ...state,
                    [author]: {
                        ...state[author],
                        questions: [...state[author].questions, id],
                    },
                };
            }

        case ANSWER_QUESTION :
            return {
                ...state,
                [action.author]: {
                    ...state[action.author],
                    answers: {
                        ...state[action.author].answers,
                        [action.qid]: action.answer
                    }
                }
            }
            
        default :
            return state
    }
}
