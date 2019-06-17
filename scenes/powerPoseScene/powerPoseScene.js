import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import PlayingPowerPose from './playingPowerPose';
import PausedPowerPose from './pausedPowerPose';
import FinishedPowerPose from './finishedPowerPose';

export default class PowerPoseScene extends Component {
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
                    <PlayingPowerPose
                        sceneScenario={sceneScenario}
                        handleSceneEnd={handleSceneEnd}
                    />
                );
                break;
            case 'pause':
                componentToRender = <PausedPowerPose />;
                break;
            case 'finish':
                componentToRender = <FinishedPowerPose />;
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

PowerPoseScene.propTypes = {
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
