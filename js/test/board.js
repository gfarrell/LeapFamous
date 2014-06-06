/* global define */
define(['registry', 'ui/object'], function(Registry, UIObject) {
    'use strict';

    return {
        setup: function() {
            // create some surfaces
            Registry.get('InteractionController').registerObject(
                new UIObject(Registry.get('FamousContext'), {
                    size: [200, 200],
                    content: 'Hello World',
                    properties: {
                        background: '#7fa39f',
                        textAlign: 'center',
                        lineHeight: '200px'
                    }
                })
            );
        }
    };
});
