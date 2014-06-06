/* global define */
define(['lodash'], function(_) {
    'use strict';

    var register      = {},
        subscriptions = {};

    return {
        has: function(name) {
            return _.has(register, name) && !_.isNull(register[name]);
        },
        register: function(name, obj) {
            if(this.has(name)) {
                throw new Error('Item already exists in the registry.');
            } else {
                register[name] = obj;
            }
        },
        get: function(name) {
            return this.has(name) ? register[name] : null;
        },
        delete: function(name) {
            if(this.has(name)) {
                register[name] = null;
            }
        },

        // event aggregation
        subscribe: function(e, callback, bind) {
            bind = bind || this;
            callback = callback.bind(bind);

            if(!_.has(subscriptions, e)) {
                subscriptions[e] = [];
            }

            if(!_.contains(subscriptions[e], callback)) {
                subscriptions[e].push(callback);
            }
        },
        publish: function(/* e, args */) {
            var args = Array.prototype.slice.call(arguments),
                e    = args.shift();

            if(_.has(subscriptions, e)) {
                _.forEach(subscriptions[e], function(callback) {
                    if(_.isFunction(callback)) {
                        callback.apply(this, args);
                    }
                });
            }
        },
        unsubscribe: function(e, callback, bind) {
            bind = bind || this;
            callback = callback.bind(bind);

            if(_.has(subscriptions, e) && _.contains(subscriptions[e], callback)) {
                subscriptions[e].splice(_.indexOf(subscriptions, callback));
            }
        }
    };
});
