/* global define */
define(['lodash'], function(_) {
    'use strict';

    var HandManager = function() {
        this._hands = {};
        this._destroyQueue = [];
    };

    _.extend(HandManager.prototype, {
        hasHand: function(id) {
            return _.has(this._hands, String(id));
        },

        addHand: function(hand) {
            var id = hand.id;

            if(this.hasHand(id)) {
                throw new Error('Already have a hand with ID ' + id + '.');
            }

            this._hands[id] = hand;
        },

        getHand: function(id) {
            if(this.hasHand(id)) {
                return this._hands[id];
            } else {
                return null;
            }
        },
    });

    return HandManager;
});
