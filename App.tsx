// In App.js in a new project

import * as React from 'react';
import {createStaticNavigation, NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen} from "./Components/HomeScreen.tsx";
import {UserNavigator} from "./Components/UserScreen.tsx";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Color, Size} from "./Constant/Theme.ts";
import {LoginScreen} from "./Components/NoUser/LoginScreen.tsx";

const Tab = createBottomTabNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        // background: Color.background,
        primary: Color.primary,
        text: Color.secondary
    },
};
const TabIcon = (props: {focused: boolean, color: string, size: number, name: string}) => {
    return (
        <FontAwesome name={props.name} size={Size.icon} color={props.focused? MyTheme.colors.primary: MyTheme.colors.text}/>
    )
}

export default function App() {
    return (
        <LoginScreen></LoginScreen>
        // <NavigationContainer theme={MyTheme}>
        //     <Tab.Navigator
        //         screenOptions={{
        //             animation: 'shift',
        //             headerShown: false,
        //             popToTopOnBlur: true, // 不保留tab内的routes stack
        //         }}>
        //         <Tab.Screen
        //             name={"Home"}
        //             component={HomeScreen}
        //             options={{
        //                 tabBarIcon: (props) => TabIcon({...props, name: 'home'})
        //             }}
        //         ></Tab.Screen>
        //         <Tab.Screen
        //             name={"User"}
        //             component={UserNavigator}
        //             options={{
        //                 tabBarIcon: (props) => TabIcon({...props, name: 'user'})
        //             }}
        //         ></Tab.Screen>
        //     </Tab.Navigator>
        // </NavigationContainer>
    );
}