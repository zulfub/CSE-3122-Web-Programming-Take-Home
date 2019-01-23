export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

export function loadProducts(products) {
    return {
        type: LOAD_PRODUCTS,
        data: {
            products: products,
            subscription: Meteor.subscribe('products')
        }
    }
}

const initialState = {
    products: [],
    isLoaded: false
};

export default function (state = initialState, action) {
    const {data, type} = action;

    switch (type) {
        case LOAD_PRODUCTS:
            return Object.assign({}, state, {
                products: data.products || [],
                isLoaded: data.subscription.ready()
            });
        default:
            return state;
    }
}
