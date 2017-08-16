import Model from '../BaseModel';
import Proxy from '../BaseProxy';

export default Ext.define('Sustaining.model.Project', {
    extend: 'Sustaining.model.Base',

    proxy: {
        type: 'sustainingproxy',
        url: '/api/projects'
    }
});