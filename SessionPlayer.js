import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import PlayerActionButton from './PlayerActionButton';

import Guides from './Guides';

export default class SessionPlayer extends Component {
    constructor(props) {
        super(props);

        this.session =
            [ // A Session
                { // A Guide
                    guideName: 'Breathing',
                    instructions: [
                        { // An Instruction
                            stageDuration: [4, 2, 4, 0],
                        },
                        {
                            stageDuration: [4, 2, 4, 0],
                        },
                        {
                            stageDuration: [4, 2, 4, 0],
                        },
                    ]
                },

                { // Guides
                    guideName: 'PowerPose',
                    instructions: [
                        { // An Instruction
                            stageDuration: [15],
                        },
                        {
                            stageDuration: [20],
                        }
                    ]
                }
            ];

        this.state = {
            guideState: 'playing', // 'playing', 'paused', 'finished'
            currentGuideIndex: 0,
            currentGuide: this.session[0],
            currentInstructionIndex: 0,
            currentInstruction: this.session[0].instructions[0],
        };
    }

    onInstructionEndHandler = () => {
        this.incrementInstructionOrGuide();
    }

    incrementInstructionOrGuide = () => {
        const {
            currentInstructionIndex,
            currentGuideIndex,
            currentGuide,
            currentInstruction
        } = this.state;

        const nextInstruction =
            this.session[currentGuideIndex]
                .instructions[currentInstructionIndex + 1];

        const nextGuide = this.session[currentGuideIndex + 1];

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

    actionButtonHandler = () => {
        const { guideState } = this.state;

        switch(guideState) {
            case 'playing':
                this.setState({
                    guideState: 'paused',
                    currentInstructionIndex: 0,
                    currentInstruction: this.session[0].instructions[0],
                });
                break;
            case 'paused':
                this.setState({ guideState: 'playing' });
                break;
            case 'finished':
                incrementInstructionOrGuide();
                break;
        }
    }

    render() {
        const {
            currentGuide,
            currentGuideIndex,
            currentInstruction,
            currentInstructionIndex,
            guideState,
        } = this.state;

        let DisplayedInstruction;

        switch (guideState) {
            case 'playing':
                DisplayedInstruction = Guides[currentGuide.guideName].Playing;
                break;
            case 'paused':
                DisplayedInstruction = Guides.Global.Paused;
            case 'finished':
                DisplayedInstruction = Guides[currentGuide.guideName].Finished;
        }

        return (
            <View style={styles.container}>
                <View style={styles.sceneProcessor}>
                    <View style={styles.scenePlayground}>
                        <DisplayedInstruction key={currentGuideIndex.toString() + currentInstructionIndex.toString()}
                            onInstructionEnd={this.onInstructionEndHandler}
                            stageDuration={currentInstruction.stageDuration}
                        />
                    </View>
                    <View style={styles.actionButtonContainer}>
                        <PlayerActionButton
                            onPress={this.actionButtonHandler}
                            guideState={this.state.guideState}
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
