import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { useScreens } from 'react-native-screens';
useScreens();

export default class HomeScreen extends React.Component {
    render () {
        return (
            <View style={styles.container}>
                <Text>Guide 1</Text>
                <Text>Guide 2</Text>
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
