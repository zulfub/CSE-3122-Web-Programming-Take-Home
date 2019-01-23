import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {getCurrentCart} from "./carts";
import {Products} from "./products";
import {check} from "meteor/check";

export const Orders = new Mongo.Collection('orders');

Meteor.methods({
    'orders.create'() {
        let subtotal = 0;
        const cart = getCurrentCart();

        Products.find({_id: {$in: cart.products || []}}).fetch()
            .forEach(e => {
                subtotal += e.price * cart.products.filter(x => x === e._id).length;
            });

        Orders.insert({
            owner: Meteor.userId(),
            cartId: cart._id,
            createdAt: new Date(),
            subtotal: subtotal,
            likeness: 0,
            customerName: Meteor.user().username
        });

        Meteor.call('carts.markAsProcessed');
    },
    'orders.like'(orderId) {
        check(orderId, String);

        Orders.update(orderId, {$set: {likeness: 1}});
    },
    'orders.dislike'(orderId) {
        check(orderId, String);

        Orders.update(orderId, {$set: {likeness: -1}});
    }
});

if (Meteor.isServer) {
    Meteor.publish('orders', () => {
        return Orders.find({
            owner: Meteor.userId()
        });
    })
}
