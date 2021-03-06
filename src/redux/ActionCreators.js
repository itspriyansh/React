import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl+'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then(response => {
        if(response.ok){
            return response;
        }else{
            let err = new Error('Error '+response.status+': '+response.statusTest);
            err.response = response;
            throw err;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(err => {
        console.log('post comment', err.message);
        alert('Your comment could not be posted\nError: '+err.message);
    });
};

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    };

    return fetch(baseUrl+'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then(response => {
        if(response.ok){
            return response;
        }else{
            let err = new Error('Error '+response.status+': '+response.statusTest);
            err.response = response;
            throw err;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => dispatch(addFeedback(response)))
    .catch(err => {
        console.log('post feedback', err.message);
        alert('Your feedback could not be posted\nError: '+err.message);
    });
};

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl+'dishes')
    .then(response => {
        if(response.ok){
            return response;
        }else{
            let err = new Error('Error '+response.status+': '+response.statusTest);
            err.response = response;
            throw err;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(err => dispatch(dishesFailed(err.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.LOADING_DISHES
});
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});
export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl+'comments')
    .then(response => {
        if(response.ok){
            return response;
        }else{
            let err = new Error('Error '+response.status+': '+response.statusTest);
            err.response = response;
            throw err;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(err => dispatch(commentsFailed(err.message)));
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch(baseUrl+'promotions')
    .then(response => {
        if(response.ok){
            return response;
        }else{
            let err = new Error('Error '+response.status+': '+response.statusTest);
            err.response = response;
            throw err;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(err => dispatch(promosFailed(err.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.LOADING_PROMOTIONS
});
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promos
});
export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errmess
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));
    return fetch(baseUrl+'leaders')
    .then(response => {
        if(response.ok){
            return response;
        }else{
            let err = new Error('Error '+response.status+': '+response.statusTest);
            err.response = response;
            throw err;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(err => dispatch(leadersFailed(err.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LOADING_LEADERS
});
export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});
export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});