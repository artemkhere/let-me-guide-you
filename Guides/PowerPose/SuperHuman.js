import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, Image, View, Vibration, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

import PowerPoseImage from './images/powerPoseImage';

export default class SuperHumanPowerPose extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progressCircleCompletion: new Animated.Value(0),
            progressCircleCompletionValue: 0,
            progressValueListener: null,
            progressCircleAnimationProcess: null,
        }
    }

    componentDidMount() { this.startProgressAnimation(); }

    componentWillUnmount() {
        const {
            progressCircleCompletion,
            progressValueListener,
            progressCircleAnimationProcess,
        } = this.state;

        progressCircleCompletion.removeListener(progressValueListener);
        Animated.timing(progressCircleCompletion).stop();
    }

    startProgressAnimation = () => {
        const {
            stepDuration,
            onInstructionEnd,
        } = this.props;

        const progressCircleCompletion = this.state.progressCircleCompletion;

        Animated.timing(progressCircleCompletion, {
            toValue: 100,
            duration: stepDuration[0] * 1000
        }).start((event) => {
            if (event.finished) {
                Vibration.vibrate(500);
                onInstructionEnd();
            }
        });

        const progressValueListener = progressCircleCompletion.addListener(({ value }) => {
            this.setState({ progressCircleCompletionValue: value });
        });

        this.setState({ progressValueListener });
    }

    render() {
        const {
            progressCircleCompletion,
            progressCircleCompletionValue
        } = this.state;

        return (
            <View style={styles.sceneArrangment}>
                <ProgressCircle
                    percent={progressCircleCompletionValue}
                    radius={120}
                    borderWidth={8}
                    color="#B38C97"
                    shadowColor="#382943"
                    bgColor="#201633"
                >
                    <PowerPoseImage />
                </ProgressCircle>
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsText}>Hold a Power Pose</Text>
                </View>
            </View>
        );
    }
}

SuperHumanPowerPose.propTypes = {
    stepDuration: PropTypes.array,
    onInstructionEnd: PropTypes.function,
};

const styles = StyleSheet.create({
    sceneArrangment: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    instructionsContainer: {
        width: '100%',
        marginTop: 48,
        display: 'flex',
        alignItems: 'center'
    },
    instructionsText: {
        fontSize: 20,
        color: '#FFD1D5',
    },
});