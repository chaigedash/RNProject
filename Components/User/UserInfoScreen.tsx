import {StyleSheet, View} from "react-native";
import {WholeRowButton} from "../common/WholeRowButton.tsx";
import {useNavigation} from "@react-navigation/native";
import {Route} from "../../Constant/Enums.ts";
import React, {useEffect, useState} from "react";
import {User} from "../../Constant/UserStorage.ts";
import {userBasicInfoType} from "../../Constant/Type.ts";

export const UserInfoScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState<userBasicInfoType>();
    useEffect(() => {
        setData(User.getInstance().getUserData());
    }, [navigation.isFocused()]);
    const handlePress = (toScreen: Route, params?: any) => {
        // toScreen : Components/UserScreen.tsx -> Stack.Screen.name
        navigation.navigate(toScreen, params);
    }
    return (
        <View style={styles.mainContainer}>
            <WholeRowButton text={'用户名'} detail={data?.userName} handler={() => handlePress(Route.UserName, {userName: data?.userName})}></WholeRowButton>
            <WholeRowButton text={'学校'} detail={data?.school} handler={() => handlePress(Route.UserSchool)}></WholeRowButton>
            <WholeRowButton text={'专业'} detail={data?.major} handler={() => handlePress(Route.UserMajor)}></WholeRowButton>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
})