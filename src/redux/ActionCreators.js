import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl+'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)));
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
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
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
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
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
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)));
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