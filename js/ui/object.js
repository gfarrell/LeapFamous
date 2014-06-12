/* global define */
define(
    [
        'lodash',
        'famous/core/Surface',
        'famous/modifiers/StateModifier', 'famous/modifiers/Draggable',
        'famous/transitions/Easing'
    ],
    function(_, Surface, StateModifier, DraggableModifier, Easing) {
        'use strict';

        var UIObject = function(context, surfaceSettings, stateSettings, draggableSettings) {
            this.context = context;

            this.surface   = new Surface(surfaceSettings);
            this.modifier = new StateModifier(stateSettings || {});
            this.draggable = new DraggableModifier(draggableSettings || {});

            this.context.add(this.modifier).add(this.draggable).add(this.surface);
        };

        _.extend(UIObject.prototype, {
            destroy: function() {
                delete this.context;
                delete this.surface;
                delete this.modifier;
                delete this.draggable;
            },

            getDefaultTransition: function() {
                return {
                    duration: 500,
                    curve: Easing.inOutSine
                };
            },

            translateBy: function(translation, instant) {
                var transition = !instant ? this.getDefaultTransition() : {};
                this.draggable.setRelativePosition(translation, transition);
            },

            moveTo: function(position, instant) {
                var transition = !instant ? this.getDefaultTransition() : {};
                this.draggable.setPosition(position, transition);
            },

            getPosition: function() {
                return this.draggable.getPosition();
            },

            getSize: function() {
                return this.surface.getSize();
            },

            getBoundingBox: function() {
                var box = [];
                var size = this.getSize();
                var posn = this.getPosition();

                box[0] = posn[0];
                box[1] = posn[0] + size[0];

                box[2] = posn[1];
                box[3] = posn[1] + size[1];

                return box;
            },

            containsPoint: function(point) {
                var box = this.getBoundingBox();
                var x = point[0], y = point[1];

                return (x >= box[0] && x <= box[1] && y >= box[2] && y <= box[3]);
            }
        });

        return UIObject;
    }
);
