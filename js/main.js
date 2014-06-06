/* global require */
require.config({
    baseUrl: '/js',
    paths: {
        famous: '../lib/famous',
        leapjs: '../lib/leapjs/leap-0.6.0',
        lodash: '../lib/lodash/dist/lodash'
    },
    shim: {
        leapjs: {
            exports: 'Leap'
        },
        famous: {
            exports: 'Famous'
        }
    }
});
require(['leapjs'], function(Leap) {
    var controllerOptions = {
            enableGestures: true
    };

    Leap.loop(controllerOptions, function(frame) {

    });
});
