// In App.js in a new project

import * as React from 'react';
import {createStaticNavigation, NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen} from "./Components/HomeScreen.tsx";
import {UserNavigator} from "./Components/UserNavigator.tsx";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Color, Size} from "./Constant/Theme.ts";
import {LoginScreen} from "./Components/NoUser/LoginScreen.tsx";
import {User} from "./Constant/UserStorage.ts";
import {useEffect, useState} from "react";
import {Route} from "./Constant/Enums.ts";
import {ResourceNavigator} from "./Components/ResourceNavigator.tsx";
import {StatisticsNavigator} from "./Components/StatisticsNavigator.tsx";
import {EvaluationNavigator} from "./Components/EvaluationNavigator.tsx";

// FIXME: 我重装node之后，出现了一些组件库的版本冲突，于是我卸载了eslint（它冲突了）
// FIXME: 如果出现问题，重装命令：npm install @typescript-eslint/utils eslint-plugin-jest
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
    const [isLoggedIn, setIsLoggedIn] = useState(User.getInstance().isLoggedIn());

    useEffect(() => {
        // 监听登录状态变化
        const handleLoginChange = () => {
            setIsLoggedIn(User.getInstance().isLoggedIn());
        };
        User.getInstance().onLoginChange(handleLoginChange);
        // 清理监听器
        return () => {
            User.getInstance().offLoginChange(handleLoginChange);
        };
    }, []);
    return (
        <>
            {
                !isLoggedIn&&<LoginScreen></LoginScreen>
            }
            {
                isLoggedIn &&
                <NavigationContainer theme={MyTheme}>
                    <Tab.Navigator
                        screenOptions={{
                            animation: 'shift',
                            headerShown: false,
                            popToTopOnBlur: true, // 不保留tab内的routes stack
                        }}>
                        <Tab.Screen
                            name={Route.Home}
                            component={HomeScreen}
                            options={{
                                tabBarIcon: (props) => TabIcon({...props, name: 'home'})
                            }}
                        ></Tab.Screen>
                        <Tab.Screen
                            name={Route.Resource}
                            component={ResourceNavigator}
                            options={{
                                tabBarIcon: (props) => TabIcon({...props, name: 'newspaper-o'})
                            }}
                        ></Tab.Screen>
                        <Tab.Screen
                            name={Route.Statistics}
                            component={StatisticsNavigator}
                            options={{
                                tabBarIcon: (props) => TabIcon({...props, name: 'pie-chart'})
                            }}
                        ></Tab.Screen>
                        <Tab.Screen
                            name={Route.Evaluation}
                            component={EvaluationNavigator}
                            options={{
                                tabBarIcon: (props) => TabIcon({...props, name: 'balance-scale'})
                            }}
                        ></Tab.Screen>
                        <Tab.Screen
                            name={Route.User}
                            component={UserNavigator}
                            options={{
                                tabBarIcon: (props) => TabIcon({...props, name: 'user'})
                            }}
                        ></Tab.Screen>
                    </Tab.Navigator>
                </NavigationContainer>
            }
        </>
    );
}