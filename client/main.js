import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.js';

import store from '../imports/store';
import {Provider} from "react-redux";

import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

const CApp = () => (
    <Provider store={store}>
        <App/>
    </Provider>
);

Meteor.startup(() => {
    render(<CApp/>, document.getElementById('render-target'));
});
