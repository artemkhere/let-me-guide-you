import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, Text, View, StyleSheet } from 'react-native';

// add this breathingLoopFormat: [3, 2, 4, 5]
// holdBreathText

export default class PlayingBreathing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundBallSize: new Animated.Value(100),
            holdBreathBallOpacity: new Animated.Value(0),
            frontText: 'Breath In',
            breathingLoopFormat: [4, 1.5, 4, 1],
        }
    }

    componentDidMount() { this.breathIn(); }

    breathIn = () => {
        const {
            backgroundBallSize,
            breathingLoopFormat
        } = this.state;

        Animated.timing(backgroundBallSize, {
            toValue: 300,
            duration: breathingLoopFormat[0] * 1000,
            easing: Easing.inOut(Easing.quad)
        }).start(() => {
            if (breathingLoopFormat[0] > 0) {
                this.setState({ frontText: 'Hold Breath' });
                this.holdBreath(breathingLoopFormat[1], this.breathOut);
            } else {
                this.setState({ frontText: 'Breath Out' });
                this.breathOut();
            }
        })
    }

    breathOut = () => {
        const {
            backgroundBallSize,
            breathingLoopFormat
        } = this.state;

        Animated.timing(this.state.backgroundBallSize, {
            toValue: 180,
            duration: breathingLoopFormat[2] * 1000,
            easing: Easing.inOut(Easing.quad)
        }).start((event) => {
            if (breathingLoopFormat[3] > 0) {
                this.setState({ frontText: 'Hold Breath' });
                this.holdBreath(breathingLoopFormat[3], this.props.finishSlide);
            } else if (event.finished) {
                this.props.finishSlide();
            }
        })
    }

    holdBreath = (duration, nextAction) => {
        Animated.sequence([
            Animated.timing(this.state.holdBreathBallOpacity, {
                toValue: 1,
                duration: duration * 500,
                easing: Easing.inOut(Easing.quad)
            }),
            Animated.timing(this.state.holdBreathBallOpacity, {
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
    finishSlide: PropTypes.function,
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
