import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';

export default class HUD extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timer: 0,
        };

        this.timerIntervalID = setInterval(() => {
            this.setState({
                timer: this.state.timer + 1
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerIntervalID);
    }

    componentDidUpdate() {
        const { guideState } = this.props;

        if (
            this.timerIntervalID
            && (guideState === 'finished' || guideState === 'all_finished')
        ) {
            clearInterval(this.timerIntervalID);
        }
    }

    render() {
        const { currentGuideNumber, totalGuides, guideName } = this.props;
        const { timer } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.guideName}>
                    {guideName}
                </Text>
                <View style={styles.smallTextContainer}>
                    <Text style={styles.text}>
                        Guide {currentGuideNumber} / {totalGuides}
                    </Text>
                    <Text style={styles.text}>
                        {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}
                    </Text>
                </View>
            </View>
        );
    }
}

HUD.propTypes = {
    currentGuideNumber: PropTypes.number.isRequired,
    totalGuides: PropTypes.number.isRequired,
    guideName: PropTypes.string.isRequired,
    guideState: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    guideName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e3b2b6',
    },
    container: {
        width: '100%',
    },
    smallTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: '#e3b2b6',
    },
});
