/*
 * File: app/view/MyContainer.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.MyContainer', {
    extend: 'Ext.Container',

    config: {
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        flex: 1
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'fit'
                        },
                        flex: 1,
                        items: [
                            {
                                xtype: 'button',
                                text: 5
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        flex: 1
                    }
                ]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'fit'
                        },
                        flex: 1,
                        items: [
                            {
                                xtype: 'button',
                                text: 30
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        width: '',
                        flex: 1
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'fit'
                        },
                        flex: 1,
                        items: [
                            {
                                xtype: 'button',
                                text: 10
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        flex: 1
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'fit'
                        },
                        flex: 1,
                        items: [
                            {
                                xtype: 'button',
                                text: 15
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        flex: 1
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'selectfield',
                        label: 'Alarm'
                    },
                    {
                        xtype: 'button',
                        text: 'GO!'
                    }
                ]
            }
        ]
    }

});