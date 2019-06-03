import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Button } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default class PlayerActionButton extends Component {
    constructor(props) { super(props); }

    renderTitle = () => {
        const currentSlideAction = this.props.currentSlideAction;

        let title;

        switch(currentSlideAction) {
            case 'play':
                title = 'Pause';
                break;
            case 'pause':
                title = 'Play';
                break;
            default:
                title = 'Check Mark';
                break;
        }

        return title;
    }

    render() {
        return (
            <View>
                <Button
                    onPress={this.props.executeSlideAction}
                    title={this.renderTitle()}
                >
                    <Icon
                        name="ios-add"
                        color="#ccc"
                        size={25}
                    />
                </Button>
            </View>
        );
    }
}

PlayerActionButton.propTypes = {
    executeSlideAction: PropTypes.function,
    currentSlideAction: PropTypes.string,
};

const styles = StyleSheet.create({

});
