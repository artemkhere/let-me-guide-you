import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Button } from 'react-native';

import BreathingSlide from './breathingSlide/breathingSlide';

export default class ProcessingEngine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSlideAction: 'play',
        };
    }

    finishSlide = () => { this.setState({ currentSlideAction: 'finish' }); }

    togglePause = () => {
        if (this.state.currentSlideAction === 'play') {
            this.setState({ currentSlideAction: 'pause' });
        } else {
            this.setState({ currentSlideAction: 'play' });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <BreathingSlide
                    slideAction={this.state.currentSlideAction}
                    finishSlide={this.finishSlide}
                    onSlideEnd={() => { console.log('Done LMAO'); }}
                />
                <Button
                    onPress={this.togglePause}
                    title="Pause"
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
