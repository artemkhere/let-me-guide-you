import React, { Component } from 'react';
import {
    Animated, Easing, TouchableWithoutFeedback, Text, View, StyleSheet
} from 'react-native';

export default class BreathingSlide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundBallSize: new Animated.Value(100),
            copywriting: 'Petah! Breath in, ok?',
        }
    }

    growBall = () => {
        Animated.timing(this.state.backgroundBallSize, {
            toValue: 300,
            duration: 4000,
            easing: Easing.linear,
        }).start(() => {
            this.setState({
                copywriting: 'PLEASE BREATH OUT, ASAP AS POSSIBLE!!! NO STRESS, OK!',
            });
            this.shrinkBall();
        })
    }

    shrinkBall = () => {
        Animated.timing(this.state.backgroundBallSize, {
            toValue: 100,
            duration: 7000,
            easing: Easing.linear,
        }).start(() => {
            this.setState({
                copywriting: 'Petah! Breath in, ok?',
            });
            this.growBall();
        })
    }

    render() {
        const {
            backgroundBallSize,
            copywriting
        } = this.state;

        return (
            <View style={styles.container}>
                <Animated.View style={[
                    styles.tennisBall,
                    {
                        width: backgroundBallSize,
                        height: backgroundBallSize,
                    },
                ]}>
                    <TouchableWithoutFeedback style={styles.button} onPress={this.growBall}>
                        <Text style={styles.buttonText}>{copywriting}</Text>
                    </TouchableWithoutFeedback>
                </Animated.View>
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
    tennisBall: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'greenyellow',
        borderRadius: 300,
        width: 100,
        height: 100,
    },
    button: {
        paddingTop: 24,
        paddingBottom: 24,
    },
    buttonText: {
        fontSize: 24,
        color: '#333',
    }
});
