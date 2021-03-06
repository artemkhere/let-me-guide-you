import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

export default class Finished extends Component {
    render() {
        return (
            <View style={styles.sceneArrangment}>
                <Text style={styles.instructionsText}>{this.props.instructionsText}</Text>
            </View>
        );
    }
}

Finished.propTypes = {
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
