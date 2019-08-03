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
            <View style={styles.homeButtonContainer}>
                <Button
                    title="Tough Moment"
                    onPress={() =>
                        switchToSession(JSON.stringify(SessionData.toughMoment))
                    }
                />
            </View>
            <View style={styles.homeButtonContainer}>
                <Button
                    title="People Are Silly"
                    onPress={() =>
                        switchToSession(JSON.stringify(SessionData.peopleAreSilly))
                    }
                />
            </View>
            <View style={styles.homeButtonContainer}>
                <Button
                    title="Need For Clarity"
                    onPress={() =>
                        switchToSession(JSON.stringify(SessionData.needForClarity))
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    homeButtonContainer: {
        marginBottom: 16
    }
});
