import React, {Component} from 'react';
import {connect} from "react-redux";
import {addToCart} from "../reducers/carts";

class Product extends Component {

    constructor(props) {
        super(props);

        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(event) {
        this.props.addToCart(event.target.id);
    }

    render() {
        const {product, user} = this.props;

        return (
            <div className="col-md-4">
                <div className="card mb-2">
                    <div className="card-body">
                        <p>{product.title}</p>
                        <span className="badge badge-primary">${product.price}</span>
                    </div>
                    {user.user._id ? (
                        <div className="card-footer">
                            <button className="btn btn-block btn-primary" onClick={this.addToCart} id={product._id}>
                                Add to Cart
                            </button>
                        </div>
                    ) : ''}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToActions = dispatch => {
    return {
        addToCart: productId => dispatch(addToCart(productId))
    };
};

export default connect(mapStateToProps, mapDispatchToActions)(Product);
