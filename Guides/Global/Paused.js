import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, Text, View, StyleSheet } from 'react-native';

export default class Paused extends Component {
    constructor(props) {
        super(props);

        this.state = { backgroundBallSize: new Animated.Value(280) }
    }

    componentDidMount() { this.playBackgroundAnimation(); }

    componentWillUnmount() { Animated.timing(this.state.backgroundBallSize).stop(); }

    playBackgroundAnimation = () => {
        const backgroundBallSize = this.state.backgroundBallSize;

        Animated.loop(
            Animated.sequence([
                Animated.timing(backgroundBallSize, {
                    toValue: 260,
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
            <View style={styles.pauseArrangment}>
                <Text style={styles.frontText}>Paused</Text>
                <Animated.View style={[
                    styles.backgroundBall,
                    {
                        width: backgroundBallSize,
                        height: backgroundBallSize,
                    },
                ]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pauseArrangment: {
        width: '100%',
        height: 280,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#201633',
    },
    backgroundBall: {
        backgroundColor: '#E2B2B7',
        opacity: 0.34,
        borderRadius: 240,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    frontText: {
        width: '100%',
        fontSize: 20,
        position: 'absolute',
        top: 125,
        color: '#FFD1D5',
        textAlign: 'center',
    },
});
