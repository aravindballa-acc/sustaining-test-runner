export default Ext.define('Sustaining.data.Proxy', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.sustainingproxy',

    reader: {
        type: 'json',
        rootProperty: 'data',
        successProperty: 'success'
    }
});