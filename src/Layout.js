import React, {Component} from 'react';
import {Container, TabPanel, TitleBar, Button} from '@extjs/ext-react';
import TestCase from './testcase/testcase';
import Bisect from './bisect/bisect';
import TestSuite from './testsuite/testsuite';
import Settings from './settings/settings.js';
import {showSettings} from './actions';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

Ext.require('Ext.layout.Center');

/**
 * The main application view and routes
 */
class Layout extends Component {
    onGearTap = () => {
        this.props.dispatch(showSettings());
    }

    render() {
        return (
            <Container>
                <Settings />
                <Container fullscreen layout="fit">
                    <TitleBar title="Sustaining Tool Suite" docked="top" ui="main">
                        <Button align="right" iconCls="x-fa fa-gear" handler={this.onGearTap}/>
                    </TitleBar>
                    <TabPanel
                        height={200}
                        shadow
                        tabBar={{
                        docked: 'top'
                    }}
                        defaults={{
                        cls: 'card',
                        layout: 'center'
                        }}>
                        <Container title="Test Cases" iconCls="x-fa fa-flask">
                            <TestCase />
                        </Container>
                        <Container title="Unit Tests" iconCls="x-fa fa-bomb">
                            <TestSuite />
                        </Container>
                        <Container title="Bisecting" iconCls="x-fa fa-git">
                            <Bisect />
                        </Container>    
                    </TabPanel>
                </Container>
            </Container>
        );
    }
}

export default connect()(withRouter(Layout));