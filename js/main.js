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
        'ui/trackers_manager', 'ui/object_manager',
        'ui/interaction_controller',
        'test/board'
    ],
    function(Leap, Engine, Registry, HandTrackerManager, UIObjectManager, InteractionController, TestBoard) {
        var controllerOptions = {
                enableGestures: true
        };

        // Famous initiation
        var context = Engine.createContext();

        // Managers
        var HTM = new HandTrackerManager();
        var UOM = new UIObjectManager();

        // Interaction Controller
        var IC = new InteractionController();

        // Register relevant things in the Registry
        Registry.register('FamousContext', context);
        Registry.register('HandTrackerManager', HTM);
        Registry.register('UIObjectManager', UOM);
        Registry.register('InteractionController', IC);


        Leap.loop(controllerOptions, function(frame) {
            IC.update(frame);
        });

        TestBoard.setup();
    }
);
