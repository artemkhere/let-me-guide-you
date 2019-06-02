import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ProcessingEngine from './processingEngine';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ProcessingEngine />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
