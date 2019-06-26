import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PlayerActionButton extends Component {
    constructor(props) { super(props); }

    getIconName = () => {
        let iconName;

        switch(this.props.guideState) {
            case 'playing':
                iconName = 'ios-pause';
                break;
            case 'paused':
                iconName = 'ios-play';
                break;
            case 'finished':
                iconName = 'ios-confirmation';
                break;
            default:
                iconName = 'Something went wrong in the Player Action Button.';
                break;
        }

        return iconName;
    }

    render() {
        return (
            <View>
                <Icon
                    name={this.getIconName()}
                    color="#FFD1D5"
                    size={48}
                    onPress={this.props.onPress}
                />
            </View>
        );
    }
}

PlayerActionButton.propTypes = {
    changeSceneState: PropTypes.function,
    guideState: PropTypes.string,
};
