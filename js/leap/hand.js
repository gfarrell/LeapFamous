/* global define */
define(['lodash', 'microevent'], function (_, MicroEvent){
    var Hand = function(hand_obj) {
        this._current = hand_obj;
    };

    MicroEvent.mixin(Hand);

    Hand.GRAB_THRESHOLD = 0.7;
    Hand.PINCH_THRESHOLD = 0.7;

    _.extend(Hand.prototype, {
        id: function() {
            return this._current.id;
        },

        update: function(hand) {
            if(hand.id != this.id()) {
                throw new Error('Tried to update with different hand.');
            }

            this._previous = this._current;
            this._current  = hand;

            this.trigger('update');
        },

        destroy: function() {
            // Unset any references so this object can be garbage-collected.
            delete this._current;
            delete this._previous;
        },

        isGrabbing: function () {
            return (this._current.grabStrength > Hand.GRAB_THRESHOLD);
        },

        getGrabLocation: function() {
            return this._current.stabilizedPalmPosition;
        },

        isPinching: function() {
            return this._current.pinchStrength > Hand.PINCH_THRESHOLD;
        }
    });

    return Hand;
});
