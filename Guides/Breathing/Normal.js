import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, Text, View, StyleSheet } from 'react-native';

export default class PlayingBreathing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundBallSize: new Animated.Value(100),
            holdBreathBallOpacity: new Animated.Value(0),
            frontText: 'Breath In',
        }
    }

    componentDidMount() { this.breathIn(); }

    breathIn = () => {
        const backgroundBallSize = this.state.backgroundBallSize;
        const stepDuration = this.props.stepDuration;

        Animated.timing(backgroundBallSize, {
            toValue: 300,
            duration: stepDuration[0] * 1000,
            easing: Easing.inOut(Easing.quad)
        }).start((event) => {
            if (stepDuration[1] > 0) {
                this.setState({ frontText: 'Hold Breath' });
                this.holdBreath(stepDuration[1], this.breathOut);
            } else if (event.finished) {
                this.setState({ frontText: 'Breath Out' });
                this.breathOut();
            }
        })
    }

    breathOut = () => {
        const {
            stepDuration,
            onInstructionEnd
        } = this.props;

        const backgroundBallSize = this.state.backgroundBallSize;

        Animated.timing(backgroundBallSize, {
            toValue: 180,
            duration: stepDuration[2] * 1000,
            easing: Easing.inOut(Easing.quad)
        }).start((event) => {
            if (stepDuration[3] > 0) {
                this.setState({ frontText: 'Hold Breath' });
                this.holdBreath(stepDuration[3], onInstructionEnd);
            } else if (event.finished) {
                onInstructionEnd();
            }
        })
    }

    holdBreath = (duration, nextAction) => {
        const holdBreathBallOpacity = this.state.holdBreathBallOpacity;

        Animated.sequence([
            Animated.timing(holdBreathBallOpacity, {
                toValue: 1,
                duration: duration * 500,
                easing: Easing.inOut(Easing.quad)
            }),
            Animated.timing(holdBreathBallOpacity, {
                toValue: 0,
                duration: duration * 500,
                easing: Easing.inOut(Easing.quad)
            })
        ]).start((event) => {
            if (event.finished) {
                this.setState({ frontText: 'Breath Out' });
                nextAction();
            }
        })
    }

    render() {
        const {
            backgroundBallSize,
            holdBreathBallOpacity,
            frontText,
        } = this.state;

        return (
            <Animated.View style={[
                styles.backgroundBall,
                {
                    width: backgroundBallSize,
                    height: backgroundBallSize,
                },
            ]}>
                <Text style={styles.frontText}>{frontText}</Text>
                <Animated.View style={[
                    styles.holdBreathBall,
                    { opacity: holdBreathBallOpacity },
                ]} />
            </Animated.View>
        );
    }
}

PlayingBreathing.propTypes = {
    stepDuration: PropTypes.array,
    onInstructionEnd: PropTypes.function,
};

const styles = StyleSheet.create({
    backgroundBall: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'greenyellow',
        borderRadius: 300,
        width: 100,
        height: 100,
    },
    holdBreathBall: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato',
        borderRadius: 120,
        opacity: 0,
        width: 120,
        height: 120,
    },
    frontText: {
        fontSize: 24,
        color: '#333',
    }
});
