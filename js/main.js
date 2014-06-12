/* global require */
require.config({
    baseUrl: '/js',
    paths: {
        famous:  '../lib/famous',
        leapjs:  '../lib/leapjs/leap-0.6.0',
        lodash:  '../lib/lodash/dist/lodash',
        eventjs: '../lib/Event.js/event.js'
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
        'leap/hand_manager', 'ui/trackers_manager', 'ui/object_manager',
        'ui/interaction_controller',
        'test/board'
    ],
    function(Leap, Engine, Registry, HandManager, HandTrackerManager, UIObjectManager, InteractionController, TestBoard) {
        var controllerOptions = {
                enableGestures: true
        };

        // Famous initiation
        var context = Engine.createContext();

        // Managers
        var HM  = new HandManager();
        var HTM = new HandTrackerManager();
        var UOM = new UIObjectManager();

        // Interaction Controller
        var IC = new InteractionController();

        // Register relevant things in the Registry
        Registry.register('FamousContext', context);
        Registry.register('HandManager', HM);
        Registry.register('HandTrackerManager', HTM);
        Registry.register('UIObjectManager', UOM);
        Registry.register('InteractionController', IC);


        Leap.loop(controllerOptions, function(frame) {
            _.each(frame.hands, function(hand) {
                var h = HM.updateHandFromDevice(hand, frame.id);
                h.setPosition(frame.interactionBox.normalizePoint(hand.stabilizedPalmPosition, true));
            });

            HM.removeOldHands(frame.id);
        });

        TestBoard.setup();
    }
);
