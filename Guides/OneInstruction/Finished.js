import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Finished extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.frontText}>Finished Words Repeat!</Text>
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
