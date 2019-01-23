import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Products = new Mongo.Collection('products');

Meteor.methods({
    'products.insert'(title, price) {
        check(title, String);
        check(price, Number);

        Products.insert({
            title, price,
            createdAt: new Date()
        });
    },
    'products.remove'(productId) {
        check(productId, String);
        Products.remove(productId);
    }
});

if (Meteor.isServer) {
    const productCount = Products.find({}).count();
    if (productCount === 0) {
        console.log('Creating products ...');
        Meteor.call('products.insert', 'Keyboard', 23.25);
        Meteor.call('products.insert', 'Mouse', 15.75);
        Meteor.call('products.insert', 'Mouse Pad', 10.00);
        Meteor.call('products.insert', 'Headphone', 5.90);
    } else {
        console.log(`There are ${productCount} products.`);
    }

    Meteor.publish('products', () => {
        return Products.find({});
    });
}
