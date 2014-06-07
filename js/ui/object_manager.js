/* global define */
define(['lodash', 'registry'], function(_, Registry) {
    'use strict';

    var UIObjectManager = function() {};

    _.extend(UIObjectManager.prototype, {
        /**
         * A list of UIObjects.
         * @type {Array}
         */
        _objects: [],

        /**
         * Check whether we have a given UIObject registered.
         * @param  {UIObject} obj
         * @return {Boolean}
         */
        hasObject: function(obj) {
            return this._objects.indexOf(obj) != -1;
        },

        /**
         * Registers a UIObject
         * @param {UIObject} obj
         */
        registerObject: function(obj) {
            if(!this.hasObject(obj)) {
                this._objects.push(obj);

                Registry.publish('UIObjectRegistered', obj);
            }
        },

        /**
         * Removes a UIObject from the registry.
         * @param  {UIObject} obj
         * @return {Boolean}  true if removed, false if not present in registry
         */
        deregisterObject: function(obj) {
            if(!this.hasObject(obj)) {
                this._objects.splice(this._objects.indexOf(obj), 1);

                Registry.publish('UIObjectDeregistered', obj);

                return true;
            } else {
                return false;
            }
        },

        /**
         * Gets the UIObject that contains a specified point
         * @param {Array} point [x,y]
         */
        objectAt: function(point) {
            var objectsAtPosition = this._objects.filter(function(obj) {
                return obj.containsPoint(point);
            });

            // At the moment we're just returning the last object in the list
            // This needs to be improved with some awareness of z-ordering
            return objectsAtPosition.length > 0 ? _.last(objectsAtPosition) : null;
        }
    });

    return UIObjectManager;
});
