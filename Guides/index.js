import GlobalPaused from './Global/Paused';
import GlobalAllFinished from './Global/AllFinished';

import BreathingPlaying from './Breathing/Playing';
import BreathingFinished from './Breathing/Finished';

import PowerPosePlaying from './PowerPose/Playing';
import PowerPoseFinished from './PowerPose/Finished';

import RepeatWordsPlaying from './RepeatWords/Playing';
import RepeatWordsFinished from './RepeatWords/Finished';

export default {
    Global: {
        Paused: GlobalPaused,
        AllFinished: GlobalAllFinished,
    },
    Breathing: {
        Playing: BreathingPlaying,
        Finished: BreathingFinished,
    },
    PowerPose: {
        Playing: PowerPosePlaying,
        Finished: PowerPoseFinished,
    },
    RepeatWords: {
        Playing: RepeatWordsPlaying,
        Finished: RepeatWordsFinished,
    }
};
