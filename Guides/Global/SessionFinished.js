import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class SessionFinished extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.frontText}>Your Session Is Complete!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    frontText: {
        fontSize: 20,
        color: '#FFD1D5',
    },
});
