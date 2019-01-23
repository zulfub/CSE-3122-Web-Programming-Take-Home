import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "redux-little-router";

class OrderHistory extends Component {
    render() {
        const {orders} = this.props.orders;

        console.log(orders);

        return (
            <div>
                <h1>Order History</h1>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Subtotal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(e => (
                        <tr key={e._id}>
                            <td>
                                <Link href={`/order/${e._id}`}>
                                    {e._id}
                                </Link>
                            </td>
                            <td>
                                <Link href={`/order/${e._id}`}>
                                    {e.createdAt.toString()}
                                </Link>
                            </td>
                            <td>
                                <Link href={`/order/${e._id}`}>
                                    ${e.subtotal}
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders
    };
};

export default connect(mapStateToProps)(OrderHistory);
