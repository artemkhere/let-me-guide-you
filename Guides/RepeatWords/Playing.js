import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, Image, View, StyleSheet } from 'react-native';

export default class Playing extends Component {
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
            duration,
            onInstructionEnd,
        } = this.props;

        const progressCircleCompletion = this.state.progressCircleCompletion;

        Animated.timing(progressCircleCompletion, {
            toValue: 100,
            duration: duration[0] * 1000
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
                <Text style={styles.instructionsText}>Say This</Text>
                <Text style={styles.instructionsText}>(outloud if you can)</Text>
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsText}>Hold a Power Pose</Text>
                </View>
            </View>
        );
    }
}

Playing.propTypes = {
    duration: PropTypes.array,
    onInstructionEnd: PropTypes.func,
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
