import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native';

import PlayerActionButton from './PlayerActionButton';
import HUD from './HUD';

import Guides from '../Guides';

export default class SessionPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            session: null,
            guideState: 'playing', // 'playing', 'paused', 'finished', 'session_finished'
            currentGuideIndex: 0,
            currentGuide: null,
            currentInstructionIndex: 0,
            currentInstruction: null,
        };
    }

    async componentDidMount() {
        this.didMount = true;

        const sessionData = await AsyncStorage.getItem('@session');
        const session = JSON.parse(sessionData);

        // This is to prevent a race condition where this component is unmounted
        // before the AsyncStorage.getItem completes and thus a memory leak
        // occurs.
        if (this.didMount) {
            this.setState({
                session,
                currentGuide: session[0],
                currentInstruction: session[0].instructions[0],
            });
        }
    }

    componentWillunmount() {
        this.didMount = false;
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
            session,
        } = this.state;

        const nextInstruction =
            session[currentGuideIndex]
                .instructions[currentInstructionIndex + 1];

        const nextGuide = session[currentGuideIndex + 1];

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
                guideState: 'finished',
            });
        }
    }

    decrementGuide = () => {
        const { currentGuideIndex, session } = this.state;
        const previousGuideIndex = currentGuideIndex - 1;

        if (0 <= previousGuideIndex) {
            const previousGuide = session[previousGuideIndex];

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
        const { currentGuideIndex, session } = this.state;
        const nextGuide = session[currentGuideIndex + 1];

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
        const { guideState, currentGuideIndex, session } = this.state;

        const { navigate } = this.props.navigation;

        if (currentGuideIndex === session.length - 1) {
            navigate('HomeScreen');
        } else {
            switch(guideState) {
                case 'playing':
                    this.setState({
                        guideState: 'paused',
                        currentInstructionIndex: 0,
                        currentInstruction: session[currentGuideIndex].instructions[0],
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
        }
    }

    navigateGuideButton = (iconName, onPressHandler, disabled) => {
        const onPress = disabled ? () => {} : onPressHandler;
        const style = disabled ? { opacity: 0.5 } : {};

        return (
            <Icon
                name={iconName}
                color="#FFD1D5"
                size={36}
                onPress={onPress}
                style={style}
            />
        );
    }

    decrementGuideButton = () => {
        const disabled = this.state.currentGuideIndex === 0;

        return this.navigateGuideButton(
            'ios-arrow-dropleft',
            this.decrementGuide,
            disabled
        );
    }

    incrementGuideButton = () => {
        const disabled = this.state.currentGuideIndex === this.state.session.length - 1;

        return this.navigateGuideButton(
            'ios-arrow-dropright',
            this.incrementGuide,
            disabled
        );
    }

    render() {
        const {
            currentGuide,
            currentGuideIndex,
            currentInstruction,
            currentInstructionIndex,
            guideState,
            session,
        } = this.state;

        const { navigation } = this.props;

        if (session === null) {
            return (
                <SafeAreaView style={styles.container}>
                    <Text>LOADING...</Text>
                </SafeAreaView>
            );
        }

        const DisplayedInstruction = this.determineDisplayedInstruction();
        const totalGuides = Object.keys(session).length;

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
                            navigation={navigation}
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

SessionPlayer.propTypes = {
    navigation: PropTypes.object.isRequired,
};

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
        paddingRight: 8,
        paddingBottom: 16,
        paddingLeft: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
