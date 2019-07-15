import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, Text, View, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

export default class Playing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundBallSize: new Animated.Value(120),
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
            toValue: 228,
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

    holdBreath = (duration, nextAction) => {
        const progressCircleCompletion = this.state.progressCircleCompletion;

        Animated.timing(progressCircleCompletion, {
            toValue: 100,
            duration: duration * 1000
        }).start((event) => {
            if (event.finished) {
                this.setState({
                    frontText: 'Breath Out',
                    progressCircleCompletion: new Animated.Value(0),
                    progressCircleCompletionValue: 0,
                });
                nextAction();
            }
        });

        const progressValueListener = progressCircleCompletion.addListener(({ value }) => {
            this.setState({ progressCircleCompletionValue: value });
        });

        this.setState({ progressValueListener });
    }

    breathOut = () => {
        const {
            duration,
            onInstructionEnd
        } = this.props;

        const backgroundBallSize = this.state.backgroundBallSize;

        Animated.timing(backgroundBallSize, {
            toValue: 120,
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

    render() {
        const {
            backgroundBallSize,
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
                    ]} />
                    <View style={styles.permanentCenterBall}>
                        <Text style={styles.frontText}>{frontText}</Text>
                    </View>
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
        width: 120,
        height: 120,
        backgroundColor: '#E2B2B7',
        opacity: 0.34,
        borderRadius: 240,
    },
    permanentCenterBall: {
        width: 126,
        height: 126,
        borderRadius: 120,
        position: 'absolute',
        top: 50,
        left: 50,
        backgroundColor: '#92717F',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    frontText: {
        fontSize: 20,
        color: '#FFD1D5',
    },
});
