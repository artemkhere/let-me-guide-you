import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, Image, View, StyleSheet } from 'react-native';

export default class Playing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wordsOpacity: new Animated.Value(0),
            progressValueListener: null,
            progressCircleAnimationProcess: null,
        }
    }

    componentDidMount() { this.startInstructionsTextAnimation(); }

    componentWillUnmount() { Animated.timing(this.state.wordsOpacity).stop(); }

    startInstructionsTextAnimation = () => {
        const {
            duration,
            onInstructionEnd,
        } = this.props;

        const wordsOpacity = this.state.wordsOpacity;

        Animated.sequence([
            Animated.timing(wordsOpacity, {
                toValue: 1,
                duration: 1000
            }),
            Animated.delay(duration[0] * 1000),
            Animated.timing(wordsOpacity, {
                toValue: 0,
                duration: 1000
            })
        ]).start((event) => {
            if (event.finished) { onInstructionEnd(); }
        });
    }

    render() {
        return (
            <View style={styles.sceneArrangment}>
                <Text style={styles.instructionsText}>Say This</Text>
                <Text style={styles.instructionsText}>(outloud if you can)</Text>
                <Animated.Text
                    style={[styles.instructionsText, { opacity: this.state.wordsOpacity }]}>
                        {this.props.instructionsText}
                </Animated.Text>
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
    sceneArrangment: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#201633',
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
