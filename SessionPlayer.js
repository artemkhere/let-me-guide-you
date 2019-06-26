import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import PlayerActionButton from 'PlayerActionButton';

/*
 * Guides
 */
import GuideBreathingNormal from 'Guides/Breathing/Normal';
import GuideBreathingPause from 'Guides/Breathing/Pause';
import GuideBreathingFinished from 'Guides/Breathing/Finished';

import GuidePowerPoseSuperHuman from 'Guides/PowerPose/SuperHuman';
import GuidePowerPosePause from 'Guides/PowerPose/Pause';
import GuidePowerPoseFinished from 'Guides/PowerPose/Finished';

const guides = {
    Breathing: {
        Normal: GuideBreathingNormal,
        Paused: GuideBreathingPause,
        Finished: GuideBreathingFinished,
    },
    PowerPose: {
        SuperHuman: GuidePowerPoseSuperHuman,
        Paused: GuidePowerPosePause,
        Finished: GuidePowerPoseFinished,
    }
}

export default class SessionPlayer extends Component {
    constructor(props) {
        super(props);

        this.session =
            [ // A Session
                { // Guides
                    guideName: 'Breathing',
                    instructions: [ // Instructions
                        { // Descriptor
                            type: 'Normal'
                            stageDuration: [4, 2, 4, 0]
                        },
                        {
                            type: 'Normal'
                            stageDuration: [4, 2, 4, 0]
                        },
                        {
                            type: 'Normal'
                            stageDuration: [4, 2, 4, 0]
                        },
                    ]
                },

                { // Guides
                    guideName: 'PowerPose',
                    instructions: [ // Instructions
                        { // Descriptor
                            type: 'SuperHuman',
                            stageDuration: [15],
                        },
                        {
                            type: 'Star',
                            stageDuration: [20],
                        }
                    ]
                }
            ];

        this.state = {
            guideState: 'playing', // 'playing', 'paused', 'finished'
            currentGuideIndex: 0,
            currentInstructionIndex: 0,
            currentGuide: this.session[0].guide,
            currentInstruction: this.sessionp[0].instructions[0],
        };
    }

    function onInstructionEndHandler {
        const nextInstruction =
            this.session[currentGuideIndex]
                .instructions[currentInstructionIndex + 1];

        const nextGuide = this.session[currentGuideIndex + 1];

        const {
            currentInstructionIndex,
            currentGuideIndex,
            currentGuide,
            currentInstruction
        } = this.state;

        if (typeof nextInstruction !== 'undefined') {
            const nextInstructionIndex = currentInstructionIndex + 1;

            this.setState({
                currentInstructionIndex: nextInstructionIndex,
                currentInstruction: currentGuide.instructions[nextInstructionIndex],
            });
        } else if (typeof nextGuide !== 'undefined') {
            const nextGuideIndex = currentGuideIndex + 1;

            this.setState({
                currentInstructionIndex: 0,
                currentInstruction: nextGuide.instructions[0],
                currentGuideIndex: nextGuideIndex,
                currentGuide: nextGuide,
            });
        } else {
            console.log('All guides have been completed');
        }
    }

    render() {
        const {
            currentGuide,
            currentInstruction,
            guideState,
        } = this.state.currentGuide;

        switch (guideState) {
            case 'playing':
                const CurrentGuide =
                    guides[currentGuide.guideName][currentInstruction.type];
                break;
            case 'paused':
                const CurrentGuide =
                    guides[currentGuide.guideName].Paused;
            case 'finished':
                const CurrentGuide =
                    guides[currentGuide.guideName].Finished;
        }

        return (
            <View style={styles.container}>
                <View style={styles.sceneProcessor}>
                    <View style={styles.scenePlayground}>
                        <CurrentGuide
                            onInstructionEnd={onInstructionEndHandler}
                            stageDuration={currentInstruction.stageDuration}
                        />
                    </View>
                    <View style={styles.actionButtonContainer}>
                        <PlayerActionButton
                            changeSceneState={this.createSceneStateHandler()}
                            currentSceneState={this.state.currentSceneState}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    sceneProcessor: {
        width: '100%',
        height: '100%',
    },
    scenePlayground: {
        width: '100%',
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    actionButtonContainer: {
        width: '100%',
        height: 80,
        paddingBottom: 16,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#201633',
    },
});
