import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, View } from 'react-native';

import ProgressCircle from 'react-native-progress-circle';

export default class PlayingBreathing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progressCircleCompletion: new Animated.Value(0),
        }
    }

    componentDidMount() { this.startProgressAnimation(); }

    startProgressAnimation = () => {
        const {
            sceneScenario,
            handleSceneEnd,
        } = this.props;

        const progressCircleCompletion = this.state.progressCircleCompletion;

        Animated.timing(progressCircleCompletion, {
            toValue: 100,
            duration: sceneScenario[0] * 1000,
        }).start((event) => {
            if (event.finished) { handleSceneEnd(); }
        })
    }

    render() {
        const progressCircleCompletion = this.state.progressCircleCompletion;

        return (
            <Animated.View>
                <ProgressCircle
                    percent={progressCircleCompletion}
                    radius={50}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 18 }}>{progressCircleCompletion}%</Text>
                </ProgressCircle>
                <Text>Strike a Power Pose</Text>
            </Animated.View>
        );
    }
}

PlayingBreathing.propTypes = {
    sceneScenario: PropTypes.array,
    handleSceneEnd: PropTypes.function,
};
