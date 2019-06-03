import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, Text, View, StyleSheet } from 'react-native';

export default class PlayingBreathing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundBallSize: new Animated.Value(100),
            frontText: 'Breath In',
        }
    }

    componentDidMount() { this.breathIn(); }

    breathIn = () => {
        Animated.timing(this.state.backgroundBallSize, {
            toValue: 300,
            duration: 3000,
            easing: Easing.linear,
        }).start((event) => {
            if (event.finished) {
                this.setState({ frontText: 'Breath Out' });
                this.breathOut();
            }
        })
    }

    breathOut = () => {
        Animated.timing(this.state.backgroundBallSize, {
            toValue: 100,
            duration: 6000,
            easing: Easing.linear,
        }).start((event) => {
            if (event.finished) { this.props.finishSlide(); }
        })
    }

    render() {
        const {
            backgroundBallSize,
            frontText
        } = this.state;

        return (
            <Animated.View style={[
                styles.backgroundBall,
                {
                    width: backgroundBallSize,
                    height: backgroundBallSize,
                },
            ]}>
                <Text style={styles.frontText}>{frontText}</Text>
            </Animated.View>
        );
    }
}

PlayingBreathing.propTypes = {
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
