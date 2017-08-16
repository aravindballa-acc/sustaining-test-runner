import React, {Component} from 'react';
import {Container, TabPanel, Dialog} from '@extjs/ext-react';
import {showSettings} from '../actions';
import {connect} from 'react-redux';

function Settings({...props}) {
    const {displayed} = props;

    const onHide = () => {
        props.dispatch(showSettings(false));
    }

    return (
        <Dialog
            title="Settings"
            displayed={displayed}
            closable
            closeAction="hide"
            width="600"
            maskTapHandler={onHide}
            onHide={onHide}
        >
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
                    tab 1
                </Container>
                <Container title="Unit Tests" iconCls="x-fa fa-bomb">
                    tab 2
                </Container>
                <Container title="Bisecting" iconCls="x-fa fa-git">
                    tab 3
                </Container>
            </TabPanel>
        </Dialog>
    );
}

const mapStateToProps = (state) => {
    return {displayed: state.showSettings}
}

export default connect(mapStateToProps)(Settings);