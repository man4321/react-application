import axios from '../axios-order'

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_INGREDIENT = "SET_INGREDIENT";
export const SET_INGREDIENT_FAILED = "SET_INGREDIENT_FAILED"


export const addIngredient = (ingName) => {
    return {
        type: "ADD_INGREDIENT",
        val: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: "REMOVE_INGREDIENT",
        val: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: "SET_INGREDIENT",
        ingredients: ingredients
    }
}

export const setIngredientsFailed = () => {
    return {
        type: "SET_INGREDIENT_FAILED",
        error: true
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('https://burger-builder-eaad3.firebaseio.com/ingrediant.json')
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(error =>dispatch(setIngredientsFailed()))

    }


}
