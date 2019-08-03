import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { Svg } from 'expo';
import PropTypes from 'prop-types';

const { Path, Circle, Rect } = Svg;

export default class Playing extends Component {
    componentDidMount() { this.props.onInstructionEnd(); }

    render() {
        return (
            <View style={styles.sceneArrangment}>
                <Text style={styles.instructionsText}>{this.props.instructionsText}</Text>
            </View>
        );
    }
}

Playing.propTypes = {
    onInstructionEnd: PropTypes.func,
    instructionsText: PropTypes.string,
}

const styles = StyleSheet.create({
    sceneArrangment: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#201633',
        paddingLeft: 16,
        paddingRight: 16,
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
        textAlign: 'center',
    },
});