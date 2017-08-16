Ext.define('override.Button', {
    override: 'Ext.Button',

    config: {
        menuOnArrowOnly: false
    },

    doTap: (me, e) => {
        const menu = me.getMenu();
        const arrowEl = me.el.down(`.${Ext.baseCSSPrefix}arrow-el`);

        if (menu && me.getMenuOnArrowOnly() && !arrowEl.getRegion().contains(e.getPoint())) {
            e.preventedMenu = true;
            return;
        }

        me.callParent([me, e]);
    }
})