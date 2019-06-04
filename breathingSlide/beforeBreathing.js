import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, Text, View, StyleSheet } from 'react-native';

export default class BeforeBreathing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Breathing will start in</Text>
            </View>
        );
    }
}

BeforeBreathing.propTypes = {
    // finishSlide: PropTypes.function,
};

const styles = StyleSheet.create({
    backgroundBall: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'greenyellow',
        borderRadius: 300,
        width: 100,
        height: 100,
    },
    frontText: {
        fontSize: 24,
        color: '#333',
    }
});
