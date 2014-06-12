/* global define */
define(['lodash', 'registry', 'ui/object', 'ui/interaction'], function(_, Registry, UIObject, Interaction) {
    'use strict';

    var HandTracker = function(hand) {
        this.surface = new UIObject(Registry.get('FamousContext'), {
            size: [50, 50],
            properties: {
                background: 'red',
                borderRadius: '50%'
            }
        }, {opacity: 0.25});

        this.interaction = new Interaction(hand, this.surface);
    };

    _.extend(HandTracker.prototype, {
        destroy: function() {
            this.surface.destroy();
            delete this.surface;

            this.interaction.destroy();
            delete this.interaction;
        }
    });

    return HandTracker;
});
