import React, {Component} from 'react';
import {Link} from "redux-little-router";
import {connect} from "react-redux";

class Navbar extends Component {
    render() {
        const {user} = this.props.user;

        return (
            <div className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
                <a className="navbar-brand" href="javascript:void(0)">MeteorCommerce</a>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link href="/" className="nav-link">Home</Link>
                    </li>
                    {user._id ? (
                        <li className="nav-item">
                            <Link href="/orders" className="nav-link">My Orders</Link>
                        </li>
                    ) : ''}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
      user: state.user
  }
};

export default connect(mapStateToProps)(Navbar);
