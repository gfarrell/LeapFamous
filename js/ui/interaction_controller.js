/* global define */
define(['lodash', 'leap/hand'], function(_, Hand) {
    'use strict';

    var InteractionController = function() {
        this.hands = {};
    };

    _.extend(InteractionController.prototype, {
        update: function(frame) {
            var present = [];
            _.each(frame.hands, function(hand) {
                if(_.has(this.hands, hand.id)) {
                    this.hands[hand.id].update(hand);
                } else {
                    this.hands[hand.id] = new Hand(hand);
                }

                present.push(hand.id);
            }.bind(this));

            this.pruneHandsNotInList(present);
        },

        pruneHandsNotInList: function(list) {
            var ourHands = _.keys(this.hands);
            var pruneList = _.difference(ourHands, list);

            _.each(pruneList, function(id) {
                this.hands[id].destroy();
                delete this.hands[id];
            }.bind(this));
        }
    });

    return InteractionController;
});
