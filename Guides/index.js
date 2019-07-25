import GlobalPaused from './Global/Paused';

import BreathingPlaying from './Breathing/Playing';
import BreathingFinished from './Breathing/Finished';

import PowerPosePlaying from './PowerPose/Playing';
import PowerPoseFinished from './PowerPose/Finished';

import RepeatWordsPlaying from './RepeatWords/Playing';
import RepeatWordsFinished from './RepeatWords/Finished';

import OneInstructionPlaying from './OneInstruction/Playing';
import OneInstructionFinished from './OneInstruction/Finished';

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
    },
    RepeatWords: {
        Playing: RepeatWordsPlaying,
        Finished: RepeatWordsFinished,
    },
    OneInstruction: {
        Playing: OneInstructionPlaying,
        Finished: OneInstructionFinished,
    }
};
