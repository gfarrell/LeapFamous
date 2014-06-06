/* global define */
define(['lodash'], function() {
    'use strict';

    var Interaction = function(hand, obj) {
        this.hand = hand;
        this.object = obj;
    };

    _.extend(Interaction.prototype, {});

    return Interaction;
});
