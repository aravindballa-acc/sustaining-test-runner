import React from 'react'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {BrowserRouter as Router} from 'react-router-dom'
import Layout from './Layout';

import TestCase from './data/model/TestCase';
import Project from './data/model/Project';

//redux store
const store = createStore(reducer, {showSettings: false});

// global stores
Ext.create('Ext.data.Store', {
    storeId: 'testCases',
    model: TestCase
});

Ext.create('Ext.data.Store', {
    storeId: 'projects',
    model: Project
});

/**
 * The main application view
 */
export default function App() {

    return (
        <Provider store={store}>
            <Router>
                <Layout/>
            </Router>
        </Provider>
    )
}
