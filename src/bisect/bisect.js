import React from 'react';
import {Container, FieldSet, Button} from '@extjs/ext-react';

export default function () {
    return (
        <FieldSet
            flex=".5"
            title="Bisecting"
            layout={{
            type: 'vbox',
            align: 'center',
            pack: 'center'
        }}>
            <Button text="Setup Bisecting" ui="action"/>
        </FieldSet>
    )
}