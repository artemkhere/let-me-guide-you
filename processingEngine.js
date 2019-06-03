import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Button } from 'react-native';

import BreathingSlide from './breathingSlide/breathingSlide';
import PlayerActionButton from './playerActionButton';

export default class ProcessingEngine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSlideAction: 'play',
        };
    }

    finishSlide = () => { this.setState({ currentSlideAction: 'finish' }); }

    createExecuteSlideAction = () => {
        const currentSlideAction = this.state.currentSlideAction;

        let executeSlideAction;

        switch(currentSlideAction) {
            case 'play':
                executeSlideAction = () => { this.setState({ currentSlideAction: 'pause' }); };
                break;
            case 'pause':
                executeSlideAction = () => { this.setState({ currentSlideAction: 'play' }); };
                break;
            default:
                executeSlideAction = () => { console.log('BUTTON WORKEd'); };
                break;
        }

        return executeSlideAction;
    }

    render() {
        const currentSlideAction = this.state.currentSlideAction;

        return (
            <View style={styles.container}>
                <BreathingSlide
                    slideAction={currentSlideAction}
                    finishSlide={this.finishSlide}
                    onSlideEnd={() => { console.log('Done LMAO'); }}
                />
                <PlayerActionButton
                    executeSlideAction={this.createExecuteSlideAction()}
                    currentSlideAction={currentSlideAction}
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
