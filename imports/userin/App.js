import React, {Component} from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {Fragment} from "redux-little-router";
import ProductList from "./ProductList";
import Orders from "./OrderHistory";
import Order from "./Order";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar/>
                        </div>
                        <div className="col-md-9">
                            <Fragment forRoute="/">
                                <div>
                                    <Fragment forRoute="/">
                                        <ProductList/>
                                    </Fragment>
                                    <Fragment forRoute="/orders">
                                        <Orders/>
                                    </Fragment>
                                    <Fragment forRoute="/order/:orderId">
                                        <Order/>
                                    </Fragment>
                                </div>
                            </Fragment>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(App);
