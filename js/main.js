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
require(['leapjs', 'ui/interaction_controller'], function(Leap, InteractionController) {
    var controllerOptions = {
            enableGestures: true
    };

    var IC = new InteractionController();

    Leap.loop(controllerOptions, function(frame) {
        IC.update(frame);
    });
});
