import React, {Component} from 'react';
import {connect} from "react-redux";
import {Carts} from "../api/carts";
import {Products} from "../api/products";
import {Link} from "redux-little-router";
import {dislikeOrder, likeOrder} from "../reducers/orders";

class Order extends Component {
    constructor(props) {
        super(props);

        this.likeOrder = this.likeOrder.bind(this);
        this.dislikeOrder = this.dislikeOrder.bind(this);
    }

    likeOrder() {
        this.props.likeOrder(this.props.router.params.orderId);
    }

    dislikeOrder() {
        this.props.dislikeOrder(this.props.router.params.orderId);
    }

    render() {
        const {orders, router} = this.props;
        const order = orders.orders.filter(x => x._id === router.params.orderId)[0];

        if (!order) {
            return <div>Loading ...</div>;
        }

        const likeness = order.likeness || 0;
        const orderedProducts = [];
        const cart = Carts.findOne(order.cartId);

        cart.products.forEach(e => {
            const product = Products.findOne(e);
            if(orderedProducts.filter(x => x._id === product._id).length > 0)
                return;

            product.amount = cart.products.filter(x => x === product._id).length;
            orderedProducts.push(product);
        });

        return (
            <div>
                <h1>Order #{order._id}</h1>
                <Link href="/orders">All Orders</Link>
                <p>{order.createdAt.toString()}</p>
                {likeness !== 1 ? <button onClick={this.likeOrder} className="btn btn-sm btn-success">Like</button> : ''}
                {likeness !== -1 ? <button onClick={this.dislikeOrder} className="btn btn-sm btn-secondary">Dislike</button> : '' }
                <h2>Order Detail</h2>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderedProducts.map(e => (
                        <tr key={e._id}>
                            <td>{e._id}</td>
                            <td>{e.title}</td>
                            <td>{e.amount}</td>
                            <td>${e.amount * e.price}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="3">Subtotal</td>
                        <td>${order.subtotal}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders,
        router: state.router
    };
};

const mapDispatchToProps = dispatch => {
    return {
        likeOrder: productId => dispatch(likeOrder(productId)),
        dislikeOrder: productId => dispatch(dislikeOrder(productId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
