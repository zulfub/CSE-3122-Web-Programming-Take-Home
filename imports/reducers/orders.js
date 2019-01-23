export const LOAD_ORDERS = 'LOAD_ORDERS';
export const CHECKOUT = 'CHECKOUT';
export const LIKE_ORDER = 'LIKE_ORDER';
export const DISLIKE_ORDER = 'DISLIKE_ORDER';

export function loadOrders(orders) {
    return {
        type: LOAD_ORDERS,
        data: {
            orders,
            subscription: Meteor.subscribe('orders')
        }
    };
}

export function checkoutCart() {
    return {
        type: CHECKOUT
    }
}

export function likeOrder(productId) {
    return {
        type: LIKE_ORDER,
        data: productId
    };
}

export function dislikeOrder(productId) {
    return {
        type: DISLIKE_ORDER,
        data: productId
    };
}

const initialState = {
    orders: [],
    isLoaded: false
};

export default function (state = initialState, action) {
    const {data, type} = action;

    switch (type) {
        case LOAD_ORDERS:
            return Object.assign({}, state, {
                orders: data.orders,
                isLoaded: data.subscription.ready()
            });
        case CHECKOUT:
            Meteor.call('orders.create');
            return state;
        case LIKE_ORDER:
            Meteor.call('orders.like', data);
            return state;
        case DISLIKE_ORDER:
            Meteor.call('orders.dislike', data);
            return state;
        default:
            return state;
    }
}
