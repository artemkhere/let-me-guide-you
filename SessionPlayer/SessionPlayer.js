import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import PlayerActionButton from './PlayerActionButton';
import HUD from './HUD';

import Guides from '../Guides';

export default class SessionPlayer extends Component {
    constructor(props) {
        super(props);

        this.session =
            [ // A Session
                { // A Guide
                    guideName: 'RepeatWords',
                    instructions: [
                        { // An Instruction
                            duration: [2.5],
                            instructionsText: 'this is NOTHING to me!'
                        },
                        { // An Instruction
                            duration: [2.5],
                            instructionsText: 'this is NOTHING to me!'
                        },
                        { // An Instruction
                            duration: [2.5],
                            instructionsText: 'this is NOTHING to me!'
                        },
                    ]
                },

                { // A Guide
                    guideName: 'Breathing',
                    instructions: [
                        { // An Instruction
                            duration: [4, 2, 4, 0],
                        },
                        {
                            duration: [4, 2, 4, 0],
                        },
                        {
                            duration: [4, 2, 4, 0],
                        },
                    ]
                },

                { // Guide
                    guideName: 'PowerPose',
                    instructions: [
                        { // An Instruction
                            duration: [15],
                        },
                        {
                            duration: [20],
                        }
                    ]
                }
            ];

        this.state = {
            guideState: 'playing', // 'playing', 'paused', 'finished', 'session_finished'
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
            currentInstruction,
            guideState,
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
        } else if (
            typeof nextGuide !== 'undefined'
            && guideState === 'playing'
        ) {
            this.setState({
                guideState: 'finished',
            });
        } else if (
            typeof nextGuide !== 'undefined'
            && guideState === 'finished'
        ) {
            const nextGuideIndex = currentGuideIndex + 1;

            this.setState({
                guideState: 'playing',
                currentInstructionIndex: 0,
                currentInstruction: nextGuide.instructions[0],
                currentGuideIndex: nextGuideIndex,
                currentGuide: nextGuide,
            });
        } else {
            this.setState({
                guideState: 'session_finished',
            });
            console.log('All guides have been completed');
        }
    }

    decrementGuide = () => {
        const { currentGuideIndex } = this.state;
        const previousGuideIndex = currentGuideIndex - 1;

        if (0 <= previousGuideIndex) {
            const previousGuide = this.session[previousGuideIndex];

            this.setState({
                guideState: 'playing',
                currentInstructionIndex: 0,
                currentInstruction: previousGuide.instructions[0],
                currentGuideIndex: previousGuideIndex,
                currentGuide: previousGuide,
            });
        }
    }

    incrementGuide = () => {
        const { currentGuideIndex } = this.state;
        const nextGuide = this.session[currentGuideIndex + 1];

        if (
            typeof nextGuide !== 'undefined'
        ) {
            const nextGuideIndex = currentGuideIndex + 1;

            this.setState({
                guideState: 'playing',
                currentInstructionIndex: 0,
                currentInstruction: nextGuide.instructions[0],
                currentGuideIndex: nextGuideIndex,
                currentGuide: nextGuide,
            });
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
                this.incrementInstructionOrGuide();
                break;
        }
    }

    determineDisplayedInstruction = () => {
        const {
            guideState,
            currentGuide
        } = this.state;

        switch (guideState) {
            case 'playing':
                return DisplayedInstruction =
                    Guides[currentGuide.guideName].Playing;
            case 'paused':
                return DisplayedInstruction =
                    Guides.Global.Paused;
            case 'finished':
                return DisplayedInstruction =
                    Guides[currentGuide.guideName].Finished;
            case 'session_finished':
                return DisplayedInstruction =
                    Guides.Global.SessionFinished;
        }
    }

    navigateGuideButton = (iconName, onPressHandler) => {
        return (
            <Icon
                name={iconName}
                color="#FFD1D5"
                size={48}
                onPress={onPressHandler}
            />
        );
    }

    decrementGuideButton = () => {
        return this.navigateGuideButton('ios-arrow-dropleft', this.decrementGuide);
    }

    incrementGuideButton = () => {
        return this.navigateGuideButton('ios-arrow-dropright', this.incrementGuide);
    }

    render() {
        const {
            currentGuide,
            currentGuideIndex,
            currentInstruction,
            currentInstructionIndex,
            guideState,
        } = this.state;

        const DisplayedInstruction = this.determineDisplayedInstruction();
        const totalGuides = Object.keys(Guides).length - 1; // -1 to remove "Global" key

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.sessionPlayer}>
                    <View style={styles.HUDContainer}>
                        <HUD
                            key={currentGuideIndex.toString()}
                            guideName={currentGuide.guideName}
                            guideState={guideState}
                            totalGuides={totalGuides}
                            currentGuideNumber={currentGuideIndex + 1}
                        />
                    </View>
                    <View style={styles.displayedInstruction}>
                        <DisplayedInstruction
                            key={
                                currentGuideIndex.toString()
                                + currentInstructionIndex.toString()
                                + this.state.guideState
                            }
                            onInstructionEnd={this.onInstructionEndHandler}
                            duration={currentInstruction.duration}
                            instructionsText={currentInstruction.instructionsText}
                        />
                    </View>
                    <View style={styles.actionButtonContainer}>
                        {this.decrementGuideButton()}
                        <PlayerActionButton
                            key={this.state.guideState}
                            onPress={this.actionButtonHandler}
                            guideState={this.state.guideState}
                        />
                        {this.incrementGuideButton()}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        backgroundColor: '#201533',
    },
    sessionPlayer: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    HUDContainer: {
        width: '100%',
    },
    displayedInstruction: {
        width: '100%',
    },
    actionButtonContainer: {
        width: '100%',
        height: 80,
        paddingBottom: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
