/* global require */
require.config({
    baseUrl: '/js',
    paths: {
        famous: '../lib/famous',
        leapjs: '../lib/leapjs/leap-0.6.0',
        lodash: '../lib/lodash/dist/lodash',
        microevent: '../lib/microevent/microevent'
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
require(
    [
        'leapjs',
        'famous/core/Engine',
        'registry',
        'ui/interaction_controller',
        'test/board'
    ],
    function(Leap, Engine, Registry, InteractionController, TestBoard) {
        var controllerOptions = {
                enableGestures: true
        };

        var context = Engine.createContext();

        var IC = new InteractionController();

        Registry.register('InteractionController', IC);
        Registry.register('FamousContext', context);

        Leap.loop(controllerOptions, function(frame) {
            IC.update(frame);
        });

        TestBoard.setup();
    }
);
