/* global define */
define(['lodash', 'registry', 'leap/hand'], function(_, Registry, Hand) {
    'use strict';

    var HandManager = function() {};

    _.extend(HandManager.prototype, {
        /**
         * A list of hands with ID keys
         * @type {Object}
         */
        _hands: {},

        /**
         * Whether we have the specified Hand.
         * @param  {Number|String} id the Hand ID
         * @return {Boolean}
         */
        hasHand: function(id) {
            return _.has(this._hands, String(id));
        },

        /**
         * Add a Hand to the list.
         * @param {Hand} hand the Hand object to add.
         */
        addHand: function(hand) {
            var id = hand.id;

            if(this.hasHand(id)) {
                throw new Error('Already have a hand with ID ' + id + '.');
            }

            this._hands[id] = hand;

            Registry.publish('HandAdded', id, hand);
        },

        /**
         * Retrieve a specified Hand.
         * @param  {Number|String} id the Hand ID
         * @return {Hand}
         */
        getHand: function(id) {
            if(this.hasHand(id)) {
                return this._hands[id];
            } else {
                return null;
            }
        },

        /**
         * Destroys a Hand object and removes it from the manager.
         * @param {Number|String} id the Hand ID.
         */
        destroyHand: function(id) {
            if(this.hasHand(id)) {
                this.getHand(id).destroy();
                delete this._hands[id];

                Registry.publish('HandDestroyed', id);

                return true;
            } else {
                return false;
            }
        },

        /**
         * Either creates a new hand object or updates an existing one depending on the hand id.
         * @param  {LeapJS.Hand} lm_hand_obj  The Leap Motion hand object.
         * @param  {String}                   The ID of the update frame.
         * @return {Hand}                     The Hand instance corresponding to the given hand object.
         */
        updateHandFromDevice: function(lm_hand_obj, frameID) {
            var id = lm_hand_obj.id;
            var hand;

            if(this.hasHand(id)) {
                hand = this.getHand(id);
                hand.update(lm_hand_obj);
                Registry.publish('HandUpdated', id, hand);
            } else {
                hand = new Hand(lm_hand_obj);
                this.addHand(hand);
            }

            hand.last_updated = parseInt(frameID);

            return hand;
        },

        removeOldHands: function(current_frame_id) {
            var id = parseInt(current_frame_id);

            this.forEach(function(hand) {
                // Remove hands that haven't been updated for ten frames
                if(hand.last_updated < (id - 10)) {
                    this.destroyHand(hand.id);
                }
            }, this);
        },

        /**
         * Cycles through hands, applying the callback to each.
         * @param {Function} callback the callback to apply on each loop.
         * @param {Mixed}    thisArg  callback bind.
         */
        forEach: function(callback, thisArg) {
            _.each(this._hands, callback, thisArg);
        }
    });

    return HandManager;
});
