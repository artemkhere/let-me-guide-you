import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import GuideBreathingNormal from 'Guides/Breathing/Normal';
import GuideBreathingPause from 'Guides/Breathing/Pause';
import GuideBreathingFinished from 'Guides/Breathing/Finished';

const guides = {
    Breathing: {
        Normal: GuideBreathingNormal,
        Pause: GuideBreathingPause,
        Finished: GuideBreathingFinished,
    }
}

export default class SessionPlayer extends Component {
    constructor(props) {
        super(props);

        this.session =
            [ // A Session
                { // Guides
                    guideName: 'Breathing',
                    instructions: [
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
                    instructions: [
                        { // Descriptor
                            type: 'SuperHuman',
                            stageDuration: 15
                        },
                        {
                            type: 'Star',
                            stageDuration: 20
                        }
                    ]
                }
            ];

        this.state = {
            currentGuideIndex: 0,
            currentInstructionIndex: 0,
            currentGuide: this.session[0].guide,
            currentInstruction: this.sessionp[0].instructions[0],
        };
    }

    function onSceneEndHandler {
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
        } = this.state.currentGuide;

        const CurrentGuide =
            guides[currentGuide.guideName][currentInstruction.type];

        return (
            <View style={styles.container}>
                <View style={styles.sceneProcessor}>
                    <View style={styles.scenePlayground}>
                        <CurrentGuide
                            onSceneEnd={onSceneEndHandler}
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
