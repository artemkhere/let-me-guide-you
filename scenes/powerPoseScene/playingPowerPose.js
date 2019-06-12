import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, Image, View, Vibration } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

import PowerPoseImage from './images/powerPoseImage';

export default class PlayingBreathing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progressCircleCompletion: new Animated.Value(0),
            progressCircleCompletionValue: 0,
            progressValueListener: null
        }
    }

    componentDidMount() { this.startProgressAnimation(); }

    componentWillUnmount() {
        const {
            progressCircleCompletion,
            progressValueListener
        } = this.state;

        progressCircleCompletion.removeListener(progressValueListener);
    }

    startProgressAnimation = () => {
        const {
            sceneScenario,
            handleSceneEnd,
        } = this.props;

        const progressCircleCompletion = this.state.progressCircleCompletion;

        Animated.timing(progressCircleCompletion, {
            toValue: 100,
            duration: sceneScenario[0] * 1000
        }).start((event) => {
            if (event.finished) {
                Vibration.vibrate(500);
                handleSceneEnd();
            }
        });

        const progressValueListener = progressCircleCompletion.addListener(({ value }) => {
            this.setState({ progressCircleCompletionValue: Math.ceil(value) });
        });

        this.setState({ progressValueListener });
    }

    render() {
        const {
            progressCircleCompletion,
            progressCircleCompletionValue
        } = this.state;

        return (
            <View>
                <ProgressCircle
                    percent={progressCircleCompletionValue}
                    radius={50}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                </ProgressCircle>
                <PowerPoseImage />
                <Text>Strike a Power Pose</Text>
            </View>
        );
    }
}


PlayingBreathing.propTypes = {
    sceneScenario: PropTypes.array,
    handleSceneEnd: PropTypes.function,
};
