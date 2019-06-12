import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, View } from 'react-native';

import ProgressCircle from 'react-native-progress-circle';

export default class PlayingBreathing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progressCircleCompletion: new Animated.Value(0),
            progressCircleCompletionValue: 0
        }
    }

    componentDidMount() { this.startProgressAnimation(); }

    startProgressAnimation = () => {
        const {
            sceneScenario,
            handleSceneEnd,
        } = this.props;

        const progressCircleCompletion = this.state.progressCircleCompletion;

        progressCircleCompletion.addListener(({ value }) => {
            this.setState({ progressCircleCompletionValue: Math.ceil(value) });
        });

        Animated.timing(progressCircleCompletion, {
            toValue: 100,
            duration: sceneScenario[0] * 1000
        }).start((event) => {
            if (event.finished) { handleSceneEnd(); }
        })
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
                    <Text style={{ fontSize: 18 }}>Power Pose Image</Text>
                </ProgressCircle>
                <Text>Strike a Power Pose</Text>
            </View>
        );
    }
}


PlayingBreathing.propTypes = {
    sceneScenario: PropTypes.array,
    handleSceneEnd: PropTypes.function,
};
