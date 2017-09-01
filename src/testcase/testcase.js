import React, { Component } from 'react';
import {
    Button,
    CheckboxField,
    ComboBoxField,
    Container,
    FormPanel,
    Menu,
    MenuItem,
    Sheet,
    TextField,
    ToolTip
} from '@extjs/ext-react';
import TestCaseForm from './form';

Ext.require( 'Ext.MessageBox' );
const MenuSeparator = reactify( Ext.menu.Separator );

const selectedValueTip = 'Delete selected test case';
const noSelectedValueTip = 'Delete all test cases';
const deleteTestCasesMsg = 'Are you sure you wish to delete all test cases?';
const deleteTestCaseMsg = 'Are you sure you wish to delete test case <b>{0}</b>?';

export default class TestCasesView extends Component {
    constructor( props ) {
        super( props );

        this.checkSelection = this.checkSelection.bind( this );
    }
    state = {
        deleteTipValue: noSelectedValueTip,
        disabled: true,
        showTestCaseDialog: false
    };

    render( ) {
        const { deleteTipValue, showTestCaseDialog, disabled, showDeleteDialog } = this.state;
        const props = {
            allowBlank: false,
            clearable: true,
            displayField: 'name',
            editable: false,
            width: 230,
            forceSelection: true,
            onChange: this.checkSelection,
            required: true,
            valueField: 'id'
        };

        return (
            <FormPanel
                width='700'
                layout={{
                align: 'start',
                pack: 'space-around',
                type: 'hbox'
            }}>
                <Container width='300' layout='vbox'>
                    <Container layout='hbox'>
                        <ComboBoxField
                            ref={input => this.testcase = input}
                            placeholder='Select Test Case'
                            store='testCases'
                            autoLoadOnValue
                            {...props} />
                        <Button iconCls='x-fa fa-refresh' />
                        <Button iconCls='x-fa fa-trash' onTap={this.onDeleteTap}>
                            <ToolTip>{deleteTipValue}</ToolTip>
                        </Button>
                    </Container>
                    <Container layout='hbox'>
                        <ComboBoxField
                            ref={input => this.project = input}
                            placeholder='Select Project'
                            store='projects'
                            {...props} />
                        <Button iconCls='x-fa fa-refresh' />
                    </Container>
                </Container>
                <Container layout='vbox'>
                    <Button
                        iconCls='x-fa fa-plus'
                        ui='confirm round'
                        text='Create Test Case'
                        handler={this.onCreateTestCaseTap} />
                    <Button
                        iconCls='x-fa fa-play'
                        ui=' round'
                        text='Run Test Case'
                        menuOnArrowOnly
                        onTap={this.onTap}
                        disabled={disabled}>
                        <Menu rel='menu'>
                            <MenuItem text='Run In New Window' iconCls='x-fa fa-clone' />
                        </Menu>
                    </Button>
                </Container>
                <TestCaseForm
                    displayed={showTestCaseDialog}
                    testcasesRef={this.testcase}
                    onHide={this.onCreateTestCaseHide} />
            </FormPanel>
        );
    }

    onTap = ( btn, e ) => {
        if ( e.preventedMenu ) {
            console.log( 'run test' );
        } else {
            console.log( 'choose menu option' );
        }
    }

    onTestCaseChange = field => {
        field;
        this;
        debugger;
    }

    onCreateTestCaseTap = ( btn, e ) => {
        this.setState({ showTestCaseDialog: true });
    }

    onCreateTestCaseHide = ( ) => {
        this.setState({ showTestCaseDialog: false });
    }

    onDeleteTap = ( ) => {
        let sel = this.testcase.getSelection( ),
            msg = deleteTestCasesMsg;

        if ( sel ) {
            msg = Ext.String.format(deleteTestCaseMsg, sel.get( 'name' ));
        }

        Ext.Msg.confirm('Delete Test Case(s)', msg, this.onConfirmDelete.bind( this ));
    }

    onConfirmDelete = ( buttonId ) => {
        if ( buttonId == 'yes' ) {
            let val = this.testcase.getValue();
            Ext.Ajax.request({ method: 'DELETE', url: Ext.String.format('/api/testcases/{0}', val) }).then(res => {
                this.testcase.clearValue();
                Ext.getStore( 'testCases' ).refresh( );
            }, res => {
                Ext.Msg.alert( 'Error', 'An error occurred. Please try again.' );
            });
        }
    }

    checkSelection = ( field, newValue ) => {
        if ( field === this.testcase ) {
            this.setState({
                deleteTipValue: field.getSelection( )
                    ? selectedValueTip
                    : noSelectedValueTip
            });
        }

        this.setState({
            disabled: !this.testcase.getValue( ) || !this.project.getValue( )
        });
    }
}