import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MovieEnvironment from './moviePlayer/movieEnvironment';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MovieEnvironment />
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
