import GlobalPaused from 'Breathing/Pause';

import BreathingPlaying from 'Breathing/Playing';
import BreathingFinished from 'Breathing/Finished';

import PowerPlaying from 'PowerPose/Playing';
import PowerPoseFinished from 'PowerPose/Finished';

export default {
    Global: {
        Paused: GlobalPaused,
    },
    Breathing: {
        Playing: BreathingNormal,
        Finished: BreathingFinished,
    },
    PowerPose: {
        Playing: PowerPosePlaying,
        Finished: PowerPoseFinished,
    }
};
