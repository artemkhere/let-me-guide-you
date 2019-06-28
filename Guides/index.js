import GlobalPaused from './Global/Paused';

import BreathingPlaying from './Breathing/Playing';
import BreathingFinished from './Breathing/Finished';

import PowerPosePlaying from './PowerPose/Playing';
import PowerPoseFinished from './PowerPose/Finished';

export default {
    Global: {
        Paused: GlobalPaused,
    },
    Breathing: {
        Playing: BreathingPlaying,
        Finished: BreathingFinished,
    },
    PowerPose: {
        Playing: PowerPosePlaying,
        Finished: PowerPoseFinished,
    }
};
