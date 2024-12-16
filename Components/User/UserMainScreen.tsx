import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Color} from "../../Constant/Theme.ts";
import {useNavigation} from "@react-navigation/native";
import AvatarUpload from "../AvatarUploader.tsx";
import {SplitLine} from "../SplitLine.tsx";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export const UserMainScreen = () => {
    interface userInfoType {
        id: string,
        name: string,
        avatar: string,
        school: string,
        major: string,
    }
    const userInfoData : userInfoType = {
        id: '00000001',
        name: '闷声发大柴',
        avatar: '',
        school: '北京工业大学',
        major: '软件工程'
    }
    const navigation = useNavigation();
    const handlePress = (toScreen: string) => {
        navigation.navigate(toScreen);
    }
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => handlePress('UserInfo')}>
                {/* 测试发现，AvatarUpload组件的press事件冒不到这里来，看来组件是事件冒泡的作用域 */}
                <View style={styles.headerWrapper}>
                    <AvatarUpload url={userInfoData.avatar}></AvatarUpload>
                    <View style={styles.userInfoWrapper}>
                        <Text style={styles.username}>
                            {userInfoData.name}
                        </Text>
                        <Text style={styles.info}>
                            用户ID: {userInfoData.id}
                        </Text>
                        <View style={styles.tagWrapper}>
                            <Text style={styles.tag}>
                                {userInfoData.school}
                            </Text>
                            <Text style={styles.tag}>
                                {userInfoData.major}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <SplitLine/>
            <TouchableOpacity onPress={() => handlePress('Collection')}>
                <View style={styles.button}>
                    <FontAwesome style={styles.buttonIcon} name="bookmark"></FontAwesome>
                    <Text style={styles.buttonText}>
                        收藏
                    </Text>
                    <FontAwesome style={styles.buttonDecorationArrow} name="chevron-right"></FontAwesome>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('Settings')}>
                <View style={styles.button}>
                    <FontAwesome style={styles.buttonIcon} name="gear"></FontAwesome>
                    <Text style={styles.buttonText}>
                        设置
                    </Text>
                    <FontAwesome style={styles.buttonDecorationArrow} name="chevron-right"></FontAwesome>
                </View>
            </TouchableOpacity>
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
        fontSize: 25,
        fontWeight: 'bold',
        color: Color.basic,
        marginBottom: 10,
    },
    info: {
        fontSize: 15,
        color: Color.secondary,
        marginBottom: 10,
    },
    tagWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
    },
    tag: {
        borderColor: Color.secondary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
        paddingTop: 0,
        fontSize: 15,
        color: Color.secondary,
        marginRight: 5,
    },
    button: {
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: Color.background,
    },
    buttonIcon: {
        width: 35,
        textAlign: 'center',
        fontSize: 30,
        color: Color.primary,
    },
    buttonText: {
        height: '100%',
        textAlignVertical: 'center',
        fontSize: 20,
        marginLeft: 5,
    },
    buttonDecorationArrow: {
        position: 'absolute',
        right: 20,
        color: Color.secondary
    }
})