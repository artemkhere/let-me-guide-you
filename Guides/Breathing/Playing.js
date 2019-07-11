import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, Text, View, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

export default class Playing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundBallSize: new Animated.Value(100),
            holdBreathBallOpacity: new Animated.Value(0),
            frontText: 'Breath In',
            progressCircleCompletion: new Animated.Value(0),
            progressCircleCompletionValue: 0,
            progressValueListener: null,
            progressCircleAnimationProcess: null,
        }
    }

    componentDidMount() { this.breathIn(); }

    componentWillUnmount() {
        const {
            progressCircleCompletion,
            progressValueListener,
            progressCircleAnimationProcess,
        } = this.state;

        progressCircleCompletion.removeListener(progressValueListener);
        Animated.timing(progressCircleCompletion).stop();
    }

    breathIn = () => {
        const backgroundBallSize = this.state.backgroundBallSize;
        const duration = this.props.duration;

        Animated.timing(backgroundBallSize, {
            toValue: 300,
            duration: duration[0] * 1000,
            easing: Easing.inOut(Easing.quad)
        }).start((event) => {
            if (duration[1] > 0) {
                this.setState({ frontText: 'Hold Breath' });
                this.holdBreath(duration[1], this.breathOut);
            } else if (event.finished) {
                this.setState({ frontText: 'Breath Out' });
                this.breathOut();
            }
        })
    }

    breathOut = () => {
        const {
            duration,
            onInstructionEnd
        } = this.props;

        const backgroundBallSize = this.state.backgroundBallSize;

        Animated.timing(backgroundBallSize, {
            toValue: 180,
            duration: duration[2] * 1000,
            easing: Easing.inOut(Easing.quad)
        }).start((event) => {
            if (duration[3] > 0) {
                this.setState({ frontText: 'Hold Breath' });
                this.holdBreath(duration[3], onInstructionEnd);
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
            progressCircleCompletion,
            progressCircleCompletionValue
        } = this.state;

        return (
            <View style={styles.guideArrangment}>
                <ProgressCircle
                    percent={progressCircleCompletionValue}
                    radius={120}
                    borderWidth={8}
                    color="#B38C97"
                    shadowColor="#382943"
                    bgColor="#201633"
                >
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
                </ProgressCircle>
            </View>
        );
    }
}

Playing.propTypes = {
    duration: PropTypes.array,
    onInstructionEnd: PropTypes.func,
};

const styles = StyleSheet.create({
    guideArrangment: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#201633',
    },
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
