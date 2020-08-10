import * as actionType from './action'
import { connect } from 'react-redux'

const INGREDIENT_PRICES = {
    meat: 10,
    salad: 5,
    bacon: 20,
    cheese: 10
}

const initialState = {
    ingredients: null,
    totalPrice: 40,
    error: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionType.ADD_INGREDIENT):
            console.log('this is addingredients')
            return {
                ingredients: {
                    ...state.ingredients,
                    [action.val]: state.ingredients[action.val] + 1
                },
                totalPrice: INGREDIENT_PRICES[action.val] + state.totalPrice


            }
        case (actionType.REMOVE_INGREDIENT):
            console.log('this is removeIngredients')
            return {
                ingredients: {
                    ...state.ingredients,
                    [action.val]: state.ingredients[action.val] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.val]

            }
        case (actionType.SET_INGREDIENT):
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            }
        case (actionType.SET_INGREDIENT_FAILED):
            return {
                ...state,
                error: true
            }
    }
    return state

}


export default reducer;
