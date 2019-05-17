import * as actionTypes from './actionTypes';
import axios from '../../axios.orders';

export const addIngredient = function (ingredientName) {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
};

export const removeIngredient = function (ingredientName) {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
};

export const setIngredients = function (ingredients) {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = function () {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = function () {
    return function (dispatch) {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            });
    }
};