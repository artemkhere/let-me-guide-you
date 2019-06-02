import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import PlayingBreathing from './playingBreathing';
import PausedBreathing from './pausedBreathing';
import FinishedBreathing from './finishedBreathing';

export default class BreathingSlide extends Component {
    constructor(props) { super(props); }

    renderSlideBasedOnAction = () => {
        const {
            slideAction,
            onSlideEnd,
            finishSlide
        } = this.props;

        let componentToRender;

        switch(slideAction) {
            case 'play':
                componentToRender = <PlayingBreathing finishSlide={finishSlide} />;
                break;
            case 'pause':
                componentToRender = <PausedBreathing />;
                break;
            default:
                componentToRender = <FinishedBreathing onSlideEnd={onSlideEnd} />;
                break;
        }

        return componentToRender;
    }

    render() {
        return <View style={styles.container}>{this.renderSlideBasedOnAction()}</View>;
    }
}

BreathingSlide.propTypes = {
    slideAction: PropTypes.string,
    onSlideEnd: PropTypes.function,
    finishSlide: PropTypes.function,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});
