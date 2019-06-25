import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PlayerActionButton extends Component {
    constructor(props) { super(props); }

    getIconName = () => {
        let iconName;

        switch(this.props.currentSceneState) {
            case 'play':
                iconName = 'ios-pause';
                break;
            case 'pause':
                iconName = 'ios-play';
                break;
            case 'finish':
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
                    onPress={this.props.changeSceneState}
                />
            </View>
        );
    }
}

PlayerActionButton.propTypes = {
    changeSceneState: PropTypes.function,
    currentSceneState: PropTypes.string,
};
