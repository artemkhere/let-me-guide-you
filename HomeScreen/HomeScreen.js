import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { AsyncStorage } from 'react-native';

import SessionData from '../SessionPlayer/SessionData';

export default function HomeScreen(props) {
    const switchToSession = async (sessionData) => {
        await AsyncStorage.setItem('@session', sessionData);
        props.navigation.navigate('SessionPlayer');
    }

    return (
        <View style={styles.container}>
            <Button
                title="Tough Moment"
                onPress={() =>
                    switchToSession(JSON.stringify(SessionData.toughMoment))
                }
            />
            <Button
                title="Doubt"
                onPress={() =>
                    switchToSession(JSON.stringify(SessionData.doubt))
                }
            />
            <Button
                title="Motivation"
                onPress={() =>
                    switchToSession(JSON.stringify(SessionData.motivation))
                }
            />
            <Button
                title="Inspiration"
                onPress={() =>
                    switchToSession(JSON.stringify(SessionData.inspiration))
                }
            />
        </View>
    );
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
