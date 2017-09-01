import React, { Component } from 'react';
import {
    Button,
    CheckboxField,
    Container,
    FormPanel,
    Sheet,
    TextField,
    Toolbar
} from '@extjs/ext-react';

export default class TestCaseForm extends Component {
    render( ) {
        const { displayed } = this.props;
        const fieldDefaults = {
            errorTarget: 'under'
        };

        return (
            <Sheet
                ref={panel => this.sheet = panel}
                title='Create New Test Case'
                displayed={displayed}
                side='top'
                modal
                onPainted={this.onShow}
                onHide={this.onHide}
                layout='center'>
                <FormPanel
                    ref={form => this.form = form}
                    submitOnAction={true}
                    url='/api/testcases'
                    width='400'
                    flex={1}
                    onSubmit={this.onSubmitSuccess}
                    onException={this.onSubmitFailure}>
                    <TextField
                        name='testcase'
                        required
                        ref={field => this.testcase = field}
                        label='Test Case'
                        placeholder='e.g., EXTJS-123'
                        autoComplete={false}
                        {...fieldDefaults} />
                    <CheckboxField
                        name='createdatafile'
                        label='Create Data File'
                        {...fieldDefaults} />
                    <Toolbar
                        shadow={false}
                        docked='bottom'
                        layout={{
                        pack: 'right',
                        type: 'hbox'
                    }}>
                        <Button text='Cancel' ui='round decline' handler={this.onHide} />
                        <Button text='Save' ui='round confirm' handler={this.onSubmit} />
                    </Toolbar>
                </FormPanel>
            </Sheet>
        );
    }

    onHide = panel => {
        this.form.reset( true );
        this.props.onHide( );
    }

    onShow = panel => {
        panel.down( 'textfield' ).focus( );
    }

    onSubmit = ( ) => {
        const { form } = this;
        if (form.validate( )) {
            form.submit( );
        }
    }

    onSubmitSuccess = ( form, result ) => {
        Ext.getStore( 'testCases' ).reload({
            callback: store => {
                this.props.testcasesRef.setValue( result.data.id );
                this.sheet.hide( );
            }
        });
    }

    onSubmitFailure = ( form, result ) => {
        const errors = result.errors;

        for ( let error of errors ) {
            let field = form.down( `[name=${ error.name }]` );
            let message = error.message;
            if ( field && message ) {
                field.setError( message );
            }
        }
    }
}
