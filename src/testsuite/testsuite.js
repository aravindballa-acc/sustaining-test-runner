import React, {Component} from 'react';
import {reactify} from '@extjs/reactor';
import {
    Container,
    FormPanel,
    Button,
    Menu,
    MenuItem,
    ComboBoxField
} from '@extjs/ext-react';

const MenuSeparator = reactify(Ext.menu.Separator);

export default function () {
    const onTap = (btn, e) => {
        if (e.preventedMenu) {
            console.log('run test')
        } else {
            console.log('choose menu option')
        }
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
                <ComboBoxField
                    placeholder="Select Project"
                    allowBlank={false}
                    forceSelection={true}/>
                <ComboBoxField
                    placeholder="Select Suite(s)"
                    allowBlank={true}
                    forceSelection={true}/> {/*<ProjectsCombo flex={1} emptyText="Select Project" />*/}
            </Container>
            <Container
                layout={{
                type: 'box',
                align: 'center'
            }}>
                <Button
                    iconCls="x-fa fa-play"
                    ui="action round"
                    text="Run Unit Test(s)"
                    arrowAlign="right"
                    menuOnArrowOnly
                    onTap={onTap}>
                    <Menu rel="menu">
                        <MenuItem text="Run In New Window" iconCls="x-fa fa-clone"/>
                        <MenuSeparator/>
                        <MenuItem text="Refresh List" iconCls="x-fa fa-refresh"/>
                        <MenuItem text="Clear List" iconCls="x-fa fa-trash"/>
                    </Menu>
                </Button>
            </Container>
        </FormPanel>
    )
}