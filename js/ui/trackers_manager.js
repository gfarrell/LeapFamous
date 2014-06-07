/* global define */
define(['lodash', 'registry', 'ui/hand_tracker'], function(_, Registry, HandTracker) {
    'use strict';

    var HandTrackerManager = function() {
        Registry.subscribe('HandAdded', this.createTracker.bind(this));
        Registry.subscribe('HandDestroyed', this.destroyTracker.bind(this));
    };

    _.extend(HandTrackerManager.prototype, {
        /**
         * Stores all the trackers by id
         * @type {Object}
         */
        _trackers: {},

        /**
         * Does a tracker exist for the given ID?
         * @param {Number|String} id the relevant Hand ID.
         */
        hasTracker: function(id) {
            return _.has(this._trackers, String(id));
        },

        /**
         * Stores a tracker.
         * @param {Number|String} id      the relevant Hand ID.
         * @param {HandTracker}   tracker the HandTracker instance to store.
         */
        addTracker: function(id, tracker) {
            this._trackers[id] = tracker;
        },

        /**
         * Retrieves a tracker for the specified ID (or null if none is stored).
         * @param {Number|String} id the relevant Hand ID.
         */
        getTracker: function(id) {
            if(this.hasTracker(id)) {
                return this._trackers[id];
            } else {
                return null;
            }
        },

        /**
         * Creates a new tracker for a given hand.
         * @param  {Number|String} id   the relevant Hand ID.
         * @param  {Hand}          hand the Hand object to track.
         * @return {HandTracker}        the HandTracker instance.
         */
        createTracker: function(id, hand) {
            if(!this.hasTracker(id)) {
                var tracker = new HandTracker(hand);
                this.addTracker(id, tracker);
                return tracker;
            }
        },

        /**
         * Destroys the tracker corresponding to the given ID.
         * @param {Number|String} id the relevant Hand ID.
         */
        destroyTracker: function(id) {
            if(this.hasTracker(id)) {
                this.getTracker(id).destroy();
                delete this._trackers[id];
            }
        }
    });

    return HandTrackerManager;
});
