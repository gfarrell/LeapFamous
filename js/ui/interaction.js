/* global define */
define(['lodash', 'registry', 'leap/hand'], function(_, Registry, Hand) {
    'use strict';

    var Interaction = function(hand, obj) {
        this.hand = hand;
        this.object = obj;

        this.hand.bind('update', this.moveWithHand.bind(this));
    };

    _.extend(Interaction.prototype, {
        destroy: function() {
            // Unbind events
            this.hand.unbind('update', this.moveWithHand.bind(this));

            // Remove refs
            delete this.hand;
            delete this.object;
        },

        moveWithHand: function() {
            var newPos = Hand.normaliseCoordinatesToContext(this.hand.getPosition(), Registry.get('FamousContext')._size);
            this.object.moveTo(newPos, true);
        }
    });

    return Interaction;
});
