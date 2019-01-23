import React, {Component} from 'react';
import AccountsUIWrapper from "./AccountsUIWrapper";
import Cart from "./Cart";
import {connect} from "react-redux";

class Sidebar extends Component {
    render() {
        const {user} = this.props;

        return <div>
            <div className="card mb-2">
                <div className="card-body">
                    <AccountsUIWrapper/>
                </div>
            </div>
            {user.user._id ? <Cart/> : ''}
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Sidebar);
