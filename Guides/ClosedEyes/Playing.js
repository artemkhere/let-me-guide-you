import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, Text, View, StyleSheet, Vibration } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

export default class Playing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            introductionOpacity: new Animated.Value(0),
            progressCircleContainerOpacity: new Animated.Value(0),
            progressCircleCompletion: new Animated.Value(0),
            progressCircleCompletionValue: 0,
            progressValueListener: null,
        }
    }

    componentDidMount() { this.startAnimation(); }

    componentWillUnmount() {
        const {
            introductionOpacity,
            progressCircleContainerOpacity,
            progressCircleCompletion,
            progressValueListener,
        } = this.state;

        Animated.timing(introductionOpacity).stop();
        Animated.timing(progressCircleContainerOpacity).stop();
        progressCircleCompletion.removeListener(progressValueListener);
        Animated.timing(progressCircleCompletion).stop();
    }

    startAnimation() {
        const {
            introductionOpacity,
            progressCircleContainerOpacity,
            progressCircleCompletion,
            progressCircleCompletionValue
        } = this.state;

        Animated.sequence([
            Animated.timing(introductionOpacity, {
                toValue: 1,
                duration: 500,
            }),
            Animated.delay(6000),
            Animated.timing(introductionOpacity, {
                toValue: 0,
                duration: 500,
            }),
            Animated.timing(progressCircleContainerOpacity, {
                toValue: 1,
                duration: 500,
            }),
            Animated.timing(progressCircleCompletion, {
                toValue: 100,
                duration: this.props.duration[0] * 1000
            })
        ]).start((event) => {
            if (event.finished) {
                Vibration.vibrate(500);
                this.props.onInstructionEnd();
            }
        });

        const progressValueListener = progressCircleCompletion.addListener(({ value }) => {
            this.setState({ progressCircleCompletionValue: value });
        });

        this.setState({ progressValueListener });
    }

    render() {
        const {
            introductionOpacity,
            progressCircleContainerOpacity,
            progressCircleCompletionValue
        } = this.state;

        const instructionsText = this.props.instructionsText;

        return (
            <View style={styles.guideArrangment}>
                <Animated.View style={[
                    styles.introductionContainer,
                    { opacity: introductionOpacity }
                ]}>
                    <Text style={styles.instructionsText}>Close your eyes and think about this:</Text>
                    <Text style={styles.instructionsText}>{instructionsText}</Text>
                    <Text style={styles.clarificationText}>(don’t worry, your phone will vibrate when time is over)</Text>
                </Animated.View>
                <Animated.View style={{ opacity: progressCircleContainerOpacity }}>
                    <ProgressCircle
                        percent={progressCircleCompletionValue}
                        radius={120}
                        borderWidth={8}
                        color="#B38C97"
                        shadowColor="#382943"
                        bgColor="#694965"
                    >
                        <Text style={styles.progressText}>{instructionsText}</Text>
                    </ProgressCircle>
                </Animated.View>
            </View>
        );
    }
}

Playing.propTypes = {
    duration: PropTypes.array,
    onInstructionEnd: PropTypes.func,
    instructionsText: PropTypes.string,
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
    introductionContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    instructionsText: {
        marginBottom: 48,
        fontSize: 20,
        color: '#FFD1D5',
        textAlign: 'center',
    },
    clarificationText: {
        fontSize: 14,
        color: '#FFD1D5',
        textAlign: 'center',
    },
    progressText: {
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 20,
        color: '#FFD1D5',
        textAlign: 'center',
    },
    backgroundBall: {
        width: 230,
        height: 230,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E2B2B7',
        opacity: 0.34,
        borderRadius: 240,
    },
});
