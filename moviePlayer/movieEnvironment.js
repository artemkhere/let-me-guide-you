import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import SceneProcessor from './sceneProcessor';

export default class MovieEnvironment extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SceneProcessor
                    onSceneEnd={() => { console.log('Play next scene, or finish the scene and wait for user to press the action button.'); }}
                    sceneScenario={[10]}
                    playerButtonActionOnFinishedScene={() => { console.log('Play next scene on button press, or interact with the player once scene is over.'); }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});
