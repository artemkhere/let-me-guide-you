import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PlayerActionButton extends Component {
    constructor(props) { super(props); }

    renderTitle = () => {
        let title;

        switch(this.props.currentSceneState) {
            case 'play':
                title = 'Pause';
                break;
            case 'pause':
                title = 'Play';
                break;
            case 'finish':
                title = 'Check Mark';
                break;
            default:
                title = 'Something went wrong in the Player Action Button.';
                break;
        }

        return title;
    }

    render() {
        return (
            <View>
                <Icon
                    name="facebook"
                    name="ios-add"
                    color="#ccc"
                    size={25}
                    onPress={this.props.changeSceneState}
                >
                    <Text style={styles.text}>{this.renderTitle()}</Text>
                </Icon>
            </View>
        );
    }
}

PlayerActionButton.propTypes = {
    changeSceneState: PropTypes.function,
    currentSceneState: PropTypes.string,
};


const styles = StyleSheet.create({
    // style the button
});
