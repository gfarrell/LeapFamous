/* global define */
define(['lodash', 'microevent'], function (_, MicroEvent){
    var Hand = function(hand_obj) {
        this._current = hand_obj;
        this.id = hand_obj.id;
    };

    MicroEvent.mixin(Hand);

    Hand.GRAB_THRESHOLD = 0.7;
    Hand.PINCH_THRESHOLD = 0.7;

    _.extend(Hand.prototype, {
        update: function(hand) {
            if(hand.id != this.id) {
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

        setPosition: function(point) {
            this.normalisedPosition = point;
        },

        getPosition: function() {
            return this.normalisedPosition;
        },

        isGrabbing: function () {
            return (this._current.grabStrength > Hand.GRAB_THRESHOLD);
        },

        isPinching: function() {
            return this._current.pinchStrength > Hand.PINCH_THRESHOLD;
        }
    });

    Hand.normaliseCoordinatesToContext = function(leapCoordinates, contextSize) {
        // Need to reverse y-axis
        var c = [leapCoordinates[0], 1-leapCoordinates[1]];

        // leap coords are between [0,1] so just multiply contextSize
        return [c[0] * contextSize[0], c[1] * contextSize[1]];
    };

    return Hand;
});
