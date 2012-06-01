//<debug>
Ext.Loader.setPath({
    'Ext': 'sdk/src'
});
//</debug>

Ext.application({
    name: 'TimeCop3',

    requires: [
        'Ext.MessageBox',
        'Ext.device.Notification',
        'Ext.device.Push'
    ],

    views: ['Main'],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },

    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('TimeCop3.view.Main'));
        Ext.device.Push.register({
            type: Ext.device.Push.ALERT | Ext.device.Push.BADGE | Ext.device.Push.SOUND,
            success: function (token) {
                Ext.Msg.alert('    token: "' + token + '"');
            },
            failure: function (error) {
                Ext.Msg.alert('     error: ' + error);
            },
            received: function (notifications) {
                Ext.Msg.alert('    ' + JSON.stringify(notifications));
            }


        });
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});
