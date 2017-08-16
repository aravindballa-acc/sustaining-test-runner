import proxy from './BaseProxy';

export default Ext.define('Sustaining.model.Base', {
    extend: 'Ext.data.Model',
    
    schema: {
        namespace: 'Sustaining.model'
    },
    proxy : {
        type: 'sustainingproxy'
    }
});