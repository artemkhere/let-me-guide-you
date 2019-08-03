import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { Svg } from 'expo';

const { Path, Circle, Rect } = Svg;

export default class Playing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            waveTranslateY: new Animated.Value(200),
            waveTranslateX: new Animated.Value(-25),
        };
    }

    componentDidMount() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    this.state.waveTranslateX,
                    {
                        toValue: 25,
                        useNativeDriver: true,
                    },
                ),
                Animated.timing(
                    this.state.waveTranslateX,
                    {
                        toValue: -25,
                        useNativeDriver: true,
                    },
                )
            ])
        ).start();

        Animated.timing(
            this.state.waveTranslateY,
            {
                toValue: 0,
                duration: 5000,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease)
            },
        ).start();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.trapezoid}>
                    <Animated.View
                        style={{
                            width: 300,
                            height: 200,
                            transform: [
                                { translateY: this.state.waveTranslateY },
                                { translateX: this.state.waveTranslateX },
                            ],
                        }}
                    >
                        <Svg width="300" height="300" viewBox="0 30 300 150">
                            <Path
                                fill="#04ACFF"
                                id="waveShape"
                                d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"
                            />
                        </Svg>
                    </Animated.View>
                </View>
                <Text style={styles.text}>{this.props.instructionsText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    trapezoid: {
        overflow: 'hidden',
        width: 150,
        height: 200,
        backgroundColor: '#61495E',
        transform: [
            { perspective: 10 },
            { rotateX: '-1deg' },
        ],
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: 60,
        fontSize: 20,
        color: '#FFD1D5',
    },
});
