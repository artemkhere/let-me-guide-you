import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import BreathingScene from './breathingScene/breathingScene';
import PlayerActionButton from './playerActionButton';

export default class SceneProcessor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSceneState: 'play',
        };
    }

    setSceneStateToFinish = () => { this.setState({ currentSceneState: 'finish' }); }

    handleSceneEnd = () => {
        this.setSceneStateToFinish();
        this.props.onSceneEnd();
    }

    createSceneStateHandler = () => {
        let changeSceneState;

        switch(this.state.currentSceneState) {
            case 'play':
                changeSceneState = () => { this.setState({ currentSceneState: 'pause' }); };
                break;
            case 'pause':
                changeSceneState = () => { this.setState({ currentSceneState: 'play' }); };
                break;
            case 'finish':
                changeSceneState = () => { this.props.playerButtonActionOnFinishedScene(); };
                break;
            default:
                changeSceneState = () => { console.log('Something went wrong inside of createSceneStateHandler.'); };
                break;
        }

        return changeSceneState;
    }

    render() {
        return (
            <View style={styles.container}>
                <BreathingScene
                    sceneState={this.state.currentSceneState}
                    handleSceneEnd={this.handleSceneEnd}
                    sceneScenario={this.props.sceneScenario}
                />
                <PlayerActionButton
                    changeSceneState={this.createSceneStateHandler()}
                    currentSceneState={this.state.currentSceneState}
                />
            </View>
        );
    }
}

SceneProcessor.propTypes = {
    onSceneEnd: PropTypes.function,
    sceneScenario: PropTypes.array,
    playerButtonActionOnFinishedScene: PropTypes.function,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});
