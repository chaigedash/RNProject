import {StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import {Color, globalStyles} from "../../Constant/Theme.ts";
import {useNavigation} from "@react-navigation/native";
import AvatarUpload from "./AvatarUploader.tsx";
import {SplitLine} from "../common/SplitLine.tsx";
import {useEffect, useState} from "react";
import {userBasicInfoType} from "../../Constant/Type.ts";
import {User} from "../../Constant/UserStorage.ts";
import {WholeRowButton} from "../common/WholeRowButton.tsx";
import {Route} from "../../Constant/Enums.ts";


export const UserMainScreen = () => {
    const [userInfoData, setUserInfoData] = useState<userBasicInfoType>({
        uid: 'not logged in',
        userName: '',
        avatar: '',
        school: '',
        major: ''
    });
    const navigation = useNavigation()
    useEffect(() => {
        setUserInfoData(User.getInstance().getUserData());
    }, [navigation.isFocused()]);
    const handlePress = (toScreen: Route, params?: any) => {
        // toScreen : Components/UserScreen.tsx -> Stack.Screen.name
        navigation.navigate(toScreen, params);
    }
    const handleLogOut = () => {
        // TODO:理论上这里应该添加后端逻辑
        ToastAndroid.show('成功登出', ToastAndroid.SHORT);
        User.getInstance().setLoggedIn(false);
        User.getInstance().setUserData({
            uid: 'not logged in',
            userName: 'unknown',
            avatar: 'unknown',
            school: 'unknown',
            major: 'unknown',
        })
    }
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => handlePress(Route.UserInfo)}>
                {/* 测试发现，AvatarUpload组件的press事件冒不到这里来，看来组件是事件冒泡的作用域 */}
                <View style={styles.headerWrapper}>
                    <AvatarUpload url={userInfoData.avatar}></AvatarUpload>
                    <View style={styles.userInfoWrapper}>
                        <Text style={[globalStyles.titleText, styles.username]}>
                            {userInfoData.userName}
                        </Text>
                        <Text style={[globalStyles.secondaryText, styles.info]}>
                            用户ID: {userInfoData.uid}
                        </Text>
                        <View style={styles.tagWrapper}>
                            <Text style={globalStyles.tag}>
                                {userInfoData.school}
                            </Text>
                            <Text style={globalStyles.tag}>
                                {userInfoData.major}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <SplitLine/>
            <WholeRowButton iconName={'bookmark'} text={'收藏'} handler={() => handlePress(Route.Collection)}></WholeRowButton>
            <WholeRowButton iconName={'gear'} text={'权限分配'} handler={() => handlePress(Route.PermissionAssignment)}></WholeRowButton>
            <WholeRowButton iconName={'dot-circle-o'} text={'登出'} handler={handleLogOut}></WholeRowButton>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerWrapper: {
        padding: 20,
        paddingTop: 50,
        flexDirection: 'row',
        backgroundColor: Color.background,
    },
    userInfoWrapper: {
        marginLeft: 20,
        flex: 1,
    },
    username: {
        marginBottom: 10,
    },
    info: {
        marginBottom: 10,
    },
    tagWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
    },
})