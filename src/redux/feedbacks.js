import * as ActionTypes from './ActionTypes';

export const Feedbacks = (state={}, action) => {
    switch(action.type){
        case ActionTypes.ADD_FEEDBACK:
            let feedback = action.payload;
            console.log('Thank you for your feedback!', JSON.stringify(feedback));
            alert('Thank you for your feedback!\n'+ JSON.stringify(feedback));
            return feedback;
        default:
            return state;
    }
}