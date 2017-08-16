import React, {Component} from 'react';
import {
    Container,
    FormPanel,
    Button,
    ComboBoxField,
    Menu,
    MenuItem,
    Sheet,
    TextField,
    CheckboxField
} from '@extjs/ext-react';
import TestCaseForm from './form';

Ext.require('Ext.MessageBox');
const MenuSeparator = reactify(Ext.menu.Separator);

export default class TestCasesView extends Component {
    constructor(props) {
        super(props);

        this.checkSelection = this
            .checkSelection
            .bind(this);
    }
    state = {
        disabled: true,
        showTestCaseDialog: false
    }

    render() {
        const {disabled, showTestCaseDialog, showDeleteDialog} = this.state;
        const props = {
            flex: 1,
            allowBlank: false,
            required: true,
            forceSelection: true,
            clearable: true,
            editable: false,
            displayField: "name",
            valueField: "id",
            onChange: this.checkSelection
        }

        return (
            <FormPanel
                width="700"
                layout={{
                type: 'hbox',
                align: 'start',
                pack: 'space-around'
            }}>
                <Container width="300" layout="vbox">
                    <Container layout="hbox">
                        <ComboBoxField
                            ref={input => this.testcase = input}
                            placeholder="Select Test Case"
                            store="testCases"
                            autoLoadOnValue
                            {...props}/>
                        <Button iconCls="x-fa fa-refresh"/>
                        <Button iconCls="x-fa fa-trash" onTap={this.onDeleteTap}/>
                    </Container>
                    <Container layout="hbox">
                        <ComboBoxField
                            ref={input => this.project = input}
                            placeholder="Select Project"
                            store="projects"
                            {...props}/>
                        <Button iconCls="x-fa fa-refresh"/>
                    </Container>
                </Container>
                <Container layout="vbox">
                    <Button
                        iconCls="x-fa fa-plus"
                        ui="confirm round"
                        text="Create Test Case"
                        handler={this.onCreateTestCaseTap}/>
                    <Button
                        iconCls="x-fa fa-play"
                        ui=" round"
                        text="Run Test Case"
                        menuOnArrowOnly
                        onTap={this.onTap}
                        disabled={disabled}>
                        <Menu rel="menu">
                            <MenuItem text="Run In New Window" iconCls="x-fa fa-clone"/>
                        </Menu>
                    </Button>
                </Container>
                <TestCaseForm
                    displayed={showTestCaseDialog}
                    testcasesRef={this.testcase}
                    onHide={this.onCreateTestCaseHide}/>
            </FormPanel>
        )
    }

    onTap = (btn, e) => {
        if (e.preventedMenu) {
            console.log('run test')
        } else {
            console.log('choose menu option')
        }
    }

    onCreateTestCaseTap = (btn, e) => {
        this.setState({showTestCaseDialog: true});
    }

    onCreateTestCaseHide = () => {
        this.setState({showTestCaseDialog: false});
    }

    onDeleteTap = () => {
        Ext.Msg.confirm('Delete Test Cases', 'Are you sure you wish to delete all test cases?', this.onConfirmDelete.bind(this));
    }

    onConfirmDelete = (buttonId) => {
        console.log('do delete')
    }

    checkSelection = () => {
        this.setState({
            disabled: !this
                .testcase
                .getValue() || !this
                .project
                .getValue()
        })
    }
}