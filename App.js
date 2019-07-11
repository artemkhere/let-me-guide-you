import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { useScreens } from 'react-native-screens';
useScreens();

import HomeScreen from './HomeScreen';
import SessionPlayer from './SessionPlayer';

const AppNavigator = createSwitchNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
        },
        SessionPlayer: {
            screen: SessionPlayer,
        },
    },
    {
        initialRouteName: 'HomeScreen',
    }
);

export default createAppContainer(AppNavigator);
