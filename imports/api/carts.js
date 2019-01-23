import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Products} from "./products";

export const Carts = new Mongo.Collection('carts');

export function getCurrentCart() {
    let cart = Carts.findOne({owner: Meteor.userId(), processed: false});

    if (!cart) {
        Meteor.call('carts.create');
        cart = Carts.findOne({owner: Meteor.userId(), processed: false});
    }

    return cart;
}

Meteor.methods({
    'carts.create'() {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Carts.insert({
            owner: Meteor.userId(),
            processed: false,
            products: []
        });
    },
    'carts.clear'() {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Carts.update(getCurrentCart()._id, {$set: {products: []}});
    },
    'carts.markAsProcessed'() {
        const cart = getCurrentCart();
        Carts.update(cart._id, {$set:{processed: true}});
    },
    'carts.addProduct'(productId) {
        check(productId, String);

        const cart = getCurrentCart();

        const product = Products.findOne(productId);
        if (!product) {
            throw new Meteor.Error('product-not-exists');
        }

        Carts.update(cart._id, {$set: {products: [...cart.products, productId]}});
    },
    'carts.removeProduct'(productId) {
        check(productId, String);

        const cart = getCurrentCart();

        if (cart.products.indexOf(productId) === -1) {
            throw new Meteor.Error('product-not-in-cart');
        }

        const i = cart.products.indexOf(productId);
        if (i !== -1) {
            cart.products.splice(i, 1);
        }

        Carts.update(cart._id, {$set: {products: cart.products}});
    }
});

if (Meteor.isServer) {
    Meteor.publish('carts', () => {
        return Carts.find({
            owner: Meteor.userId()
        });
    });
}
