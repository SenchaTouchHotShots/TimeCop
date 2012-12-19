Ext.define('TimeCop.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'TimeCop.view.incrementButton'
    ],

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
                        width: 120,
                        layout: {
                            type: 'fit'
                        },
                        items: [
                            {
                                xtype: 'incrementButton'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        flex: 1
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'fit'
                        },
                        width: 120,
                        items: [
                            {
                                xtype: 'incrementButton',
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
                        width: '',
                        layout: {
                            type: 'fit'
                        },
                        width: 120,
                        items: [
                            {
                                xtype: 'button',
                                hidden: true,
                                id: 'startButton',
                                itemId: 'mybutton5',
                                ui: 'roundStart',
                                text: 0
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
                        width: 120,
                        items: [
                            {
                                xtype: 'incrementButton',
                                text: 30
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        flex: 1
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'fit'
                        },
                        width: 120,
                        items: [
                            {
                                xtype: 'incrementButton',
                                text: 60
                            }
                        ]
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onStartButtonTap',
                event: 'tap',
                delegate: '#startButton'
            }
        ]
    },

    onStartButtonTap: function(button, e, options) {
        var delay = button.getText();
        setTimeout(function() {
            Ext.device.Notification.vibrate();
            Ext.device.Notification.show({
                title: ' Back to work minion! ',
                message: 'The boss needs a new villa!'
            });
        },parseInt(delay)*1000);
    }

});