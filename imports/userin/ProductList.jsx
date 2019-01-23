import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadProducts} from "../reducers/products";
import Product from "./Product";

class ProductList extends Component {
    componentWillMount() {
        this.props.loadProducts();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.props.products.products.map(e => <Product key={e._id} product={e}/>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadProducts: loadProducts
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
