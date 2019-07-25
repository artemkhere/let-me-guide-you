import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, Image, View, StyleSheet } from 'react-native';

export default class Playing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wordsOpacity: new Animated.Value(0),
        }
    }

    componentDidMount() { this.startInstructionsTextAnimation(); }

    componentWillUnmount() { Animated.sequence(this.state.wordsOpacity).stop(); }

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
                <Animated.Text
                    style={[styles.instructionsText, { opacity: this.state.wordsOpacity }]}>
                        {this.props.instructionsText}
                </Animated.Text>
                <Text style={styles.descriptionText}>Say This</Text>
                <Text style={styles.smallInstructionsText}>(outloud if you can)</Text>

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
    descriptionText: {
        fontSize: 18,
        color: '#FFD1D5',
        marginTop: 32,
        opacity: 0.7
    },
    smallInstructionsText: {
        fontSize: 12,
        color: '#FFD1D5',
        opacity: 0.7
    },
    instructionsText: {
        fontSize: 26,
        color: '#FFD1D5',
    },
});
