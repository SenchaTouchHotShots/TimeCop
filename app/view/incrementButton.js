Ext.define('TimeCop.view.incrementButton', {
    extend: 'Ext.Button',
    alias: 'widget.incrementButton',

    config: {
        itemId: 'mybutton',
        ui: 'round',
        text: 5,
        listeners: [
            {
                fn: 'onMybuttonTap',
                event: 'tap'
            }
        ]
    },

    onMybuttonTap: function(button, e, options) {
        var increment = button.getText();
        var start = Ext.getCmp('startButton');

        var startInt = start.getText();

        var total = parseInt(startInt, 10) + parseInt(increment, 10);

        start.setText(total);
        if(start.isHidden()) {
            start.show();
        }
    }

});