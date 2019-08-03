import GlobalPaused from './Global/Paused';

import BreathingPlaying from './Breathing/Playing';
import BreathingFinished from './Breathing/Finished';

import PowerPosePlaying from './PowerPose/Playing';
import PowerPoseFinished from './PowerPose/Finished';

import RepeatWordsPlaying from './RepeatWords/Playing';
import RepeatWordsFinished from './RepeatWords/Finished';

import ClosedEyesPlaying from './ClosedEyes/Playing';
import ClosedEyesFinished from './ClosedEyes/Finished';

import OneInstructionPlaying from './OneInstruction/Playing';
import OneInstructionFinished from './OneInstruction/Finished';

import DrinkWaterPlaying from './DrinkWater/Playing';
import DrinkWaterFinished from './DrinkWater/Finished';

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
    ClosedEyes: {
        Playing: ClosedEyesPlaying,
        Finished: ClosedEyesFinished,
    },
    OneInstruction: {
        Playing: OneInstructionPlaying,
        Finished: OneInstructionFinished,
    },
    DrinkWater: {
        Playing: DrinkWaterPlaying,
        Finished: DrinkWaterFinished,
    },
};
