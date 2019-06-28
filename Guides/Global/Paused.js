import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, Text, View, StyleSheet } from 'react-native';

export default class Paused extends Component {
    constructor(props) {
        super(props);

        this.state = { backgroundBallSize: new Animated.Value(280) }
    }

    componentDidMount() { this.playBackgroundAnimation(); }

    playBackgroundAnimation = () => {
        const backgroundBallSize = this.state.backgroundBallSize;

        Animated.loop(
            Animated.sequence([
                Animated.timing(backgroundBallSize, {
                    toValue: 300,
                    duration: 1500,
                    easing: Easing.linear,
                }),
                Animated.timing(backgroundBallSize, {
                    toValue: 280,
                    duration: 1500,
                    easing: Easing.linear,
                }),
            ]),
        ).start();
    }

    render() {
        const backgroundBallSize = this.state.backgroundBallSize;

        return (
            <View>
                <Animated.View style={[
                    styles.backgroundBall,
                    {
                        width: backgroundBallSize,
                        height: backgroundBallSize,
                    },
                ]}>
                    <Text style={styles.frontText}>Paused</Text>
                </Animated.View>
            </View>
        );
    }
}

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
    },
});

