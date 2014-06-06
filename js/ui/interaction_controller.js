/* global define */
define(
    [
        'lodash',
        'leap/hand',
        'ui/interaction'
    ],
    function(_, Hand, Interaction) {
        'use strict';

        var InteractionController = function() {
            this.hands = {};
            this.interactions = {};
            this.objects = [];
        };

        _.extend(InteractionController.prototype, {
            registerObject: function(obj) {
                if(this.objects.indexOf(obj) == -1) {
                    return this.objects.push(obj);
                }
            },

            unregisterObject: function(obj) {
                var i = this.objects.indexOf(obj);
                delete this.objects[i];
                this.objects = _.compact(this.objects);
            },

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

                this.checkInteractions();
            },

            pruneHandsNotInList: function(list) {
                var ourHands = _.keys(this.hands);

                _.each(ourHands, function(id) {
                    if(list.indexOf(parseInt(id)) == -1) {
                        this.hands[id].destroy();
                        delete this.hands[id];
                    }
                }.bind(this));
            },

            objectAt: function(point) {
                // Cycle through objects
                // Find which one is under this point

                var objectsAtPosition = [];

                _.each(this.objects, function(obj) {
                    if(obj.containsPoint(point)) {
                        objectsAtPosition.push(obj);
                    }
                });

                // At the moment we're just returning the last object in the list
                // This needs to be improved with some awareness of z-ordering
                return _.last(objectsAtPosition);
            },

            checkInteractions: function() {
                // Need to see if our hands are grabbing
                // If hand.isGrabbing() and no interaction exists, start one
                // If hand.isGrabbing() and interaction exists, then ignore
                // If not hand.isGrabbing() and interaction exists, destroy interaction
                // If not hand.isGrabbing() and no interaction exists, ignore

                _.each(this.hands, function(hand, id) {
                    var grab = hand.isGrabbing();
                    var haveInteraction = _.has(this.interactions, id);

                    if(!grab && haveInteraction) {
                        this.interactions[id].destroy();
                        delete this.interactions[id];
                    }

                    if(grab && !haveInteraction) {
                        // Create interaction
                        // Store interaction
                    }
                }.bind(this));
            }
        });

        return InteractionController;
    }
);
