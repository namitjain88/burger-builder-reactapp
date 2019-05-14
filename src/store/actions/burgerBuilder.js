import * as actionTypes from './actionTypes';

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