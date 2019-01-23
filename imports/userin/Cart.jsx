import React, {Component} from 'react';
import {connect} from "react-redux";
import {Products} from "../api/products";
import {removeProduct} from "../reducers/carts";
import {checkoutCart} from "../reducers/orders";

class Cart extends Component {
    constructor(props) {
        super(props);

        this.removeProduct = this.removeProduct.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    removeProduct(event) {
        this.props.removeProduct(event.target.id);
    }

    checkout() {
        this.props.checkout();
    }

    render() {
        const {cart} = this.props;

        console.log(cart);

        const finalProducts = [];
        let subtotal = 0.0;

        Products.find({_id: {$in: cart.products || []}}).fetch()
            .forEach((e) => {

                const numberOfItem = cart.products.filter(x => x === e._id).length;

                subtotal += e.price * numberOfItem;

                e.amount = numberOfItem;
                finalProducts.push(e);
            });

        return (
            <div className="card">
                <div className="card-header">
                    <span className="card-title">
                        My Cart
                    </span>
                </div>
                <div className="list-group">
                    {finalProducts.length === 0 ? (
                        <a href="javascript:void(0)" className="list-group-item">No items in your cart.</a>
                    ) : ''}
                    {finalProducts.map(e => (
                        <div key={e._id} className="list-group-item">
                            {e.title}
                            <div className="pull-right">
                                <span className="badge badge-primary">${e.price}</span>
                                <span className="badge badge-secondary">x{e.amount}</span>
                                <button className="btn btn-sm btn-danger" id={e._id} onClick={this.removeProduct}>X</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="card-footer">
                    Subtotal: ${subtotal}
                </div>
                <div className="card-footer">
                    <button className="btn btn-secondary btn-block" onClick={this.checkout}>
                        CHECKOUT
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.currentCart.cart
    };
};

const mapDispatchToProps = dispatch => {
  return {
      removeProduct: productId => dispatch(removeProduct(productId)),
      checkout: () => dispatch(checkoutCart())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
