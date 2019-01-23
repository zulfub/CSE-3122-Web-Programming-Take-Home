import {Carts, getCurrentCart} from "../api/carts";

export const LOAD_CURRENT_CART = 'LOAD_CURRENT_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

const initialState = {
    cart: {products: []},
    isLoaded: false
};

export function loadCurrentCart(cart) {
    return {
        type: LOAD_CURRENT_CART,
        data: {
            cart: cart,
            subscription: Meteor.subscribe('carts')
        }
    };
}

export function addToCart(productId) {
    return {
        type: ADD_TO_CART,
        data: productId
    };
}

export function removeProduct(productId) {
    return {
        type: REMOVE_FROM_CART,
        data: productId
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_CURRENT_CART:
            return Object.assign({}, state, {
                cart: action.data.cart || {products: []},
                isLoaded: action.data.subscription.ready()
            });

        case ADD_TO_CART:
            Meteor.call('carts.addProduct', action.data);
            return state;

        case REMOVE_FROM_CART:
            Meteor.call('carts.removeProduct', action.data);
            return state;

        default:
            return state;
    }
}
