import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import PlayingBreathing from './playingBreathing';
import PausedBreathing from './pausedBreathing';
import FinishedBreathing from './finishedBreathing';

export default class BreathingScene extends Component {
    constructor(props) { super(props); }

    renderSceneBasedOnState = () => {
        const {
            sceneState,
            sceneScenario,
            handleSceneEnd,
            finishScene
        } = this.props;

        let componentToRender;

        switch(sceneState) {
            case 'play':
                componentToRender = (
                    <PlayingBreathing
                        sceneScenario={sceneScenario}
                        handleSceneEnd={handleSceneEnd}
                    />
                );
                break;
            case 'pause':
                componentToRender = <PausedBreathing />;
                break;
            case 'finish':
                componentToRender = <FinishedBreathing />;
                break;
            default:
                componentToRender = <View>Something went wrong</View>;
                break;
        }

        return componentToRender;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderSceneBasedOnState()}
            </View>
        );
    }
}

BreathingScene.propTypes = {
    sceneAction: PropTypes.string,
    sceneScenario: PropTypes.array,
    handleSceneEnd: PropTypes.function,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});
