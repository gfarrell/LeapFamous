/* global define */
define(
    [
        'lodash',
        'registry',
        'leap/hand',
        'ui/interaction',
        'ui/hand_tracker'
    ],
    function(_, Registry, Hand, Interaction, HandTracker) {
        'use strict';

        var InteractionController = function() {
            this.interactions = {};

            Registry.subscribe('HandUpdated', this.checkInteractions.bind(this));
        };

        _.extend(InteractionController.prototype, {
            checkInteractions: function(id, hand) {
                // Need to see if our hands are grabbing
                // If hand.isGrabbing() and no interaction exists, start one
                // If hand.isGrabbing() and interaction exists, then ignore
                // If not hand.isGrabbing() and interaction exists, destroy interaction
                // If not hand.isGrabbing() and no interaction exists, ignore

                var grab = hand.isGrabbing();
                var haveInteraction = _.has(this.interactions, id);

                if(!grab && haveInteraction) {
                    this.interactions[id].destroy();
                    delete this.interactions[id];
                }

                if(grab && !haveInteraction) {
                    // Create interaction
                    // Store interaction
                    var handPosNorm = Hand.normaliseCoordinatesToContext(hand.getPosition(), this.contextSize());
                    var objAtPosn = Registry.get('UIObjectManager').objectAt(handPosNorm);

                    if(objAtPosn !== null) {
                        var ia = new Interaction(hand, objAtPosn);
                        this.interactions[id] = ia;
                    }
                }
            },

            contextSize: function() {
                return Registry.get('FamousContext')._size;
            }
        });

        return InteractionController;
    }
);
