import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
            && (guideState === 'finished' || guideState === 'session_finished')
        ) {
            clearInterval(this.timerIntervalID);
        }
    }

    renderCloseButton = () => {
        const { navigate } = this.props.navigation;

        return (
            <Icon
                name="ios-close"
                color="#FFD1D5"
                size={48}
                onPress={() => navigate('HomeScreen')}
            />
        )
    }

    renderGuideNumber = () => {
        const { currentGuideNumber, totalGuides } = this.props;

        return (
            <Text style={styles.text}>
                Guide {currentGuideNumber} / {totalGuides}
            </Text>
        );
    }

    renderGuideTimer = () => {
        const { timer } = this.state;

        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        return (
            <Text style={styles.text}>
                {minutes}:{seconds < 10 ? '0' : ''}{seconds}
            </Text>
        );
    }

    render() {
        const { guideName } = this.props;

        return (
            <View style={styles.container}>
                {this.renderCloseButton()}
                <Text style={styles.guideName}>
                    {guideName}
                </Text>
                <View style={styles.smallTextContainer}>
                    {this.renderGuideNumber()}
                    {this.renderGuideTimer()}
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
    navigation: PropTypes.object.isRequired,
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
