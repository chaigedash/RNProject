import {ToastAndroid} from "react-native";
import {Input} from "@rneui/base";
import React, {useEffect, useState} from "react";
import {inputType} from "../../../Constant/Type.ts";
import {Color} from "../../../Constant/Theme.ts";
import {verifyName} from "../../../Utils/Verify.ts";
import {User} from "../../../Constant/UserStorage.ts";
import {useNavigation} from "@react-navigation/native";
import {EditData} from "../../common/EditData.tsx";

export const UserNameScreen: React.FC<{route: any}> = ({route}) => {
    const [userName, setUserName] = useState<inputType>({
        value: 'unknown',
        errorMessage: '',
    });
    const navigation = useNavigation();
    useEffect(() => {
        // FIXME: 完全可以改成直接从User单例里获取，目前没改是因为我想保留一些路由传参的经验
        if (route.params.userName) {
            setUserName({...userName, value: route.params.userName});
        }
    }, [route.params]);
    const handleNameBlur = () => {
        const verifyResult = verifyName(userName.value);
        setUserName({...userName, errorMessage: verifyResult.message})
    }
    const handleSave = () => {
        ToastAndroid.show('保存成功', ToastAndroid.SHORT);
        User.getInstance().setUserData({
            ...User.getInstance().getUserData(),
            userName: userName.value,
        })
        navigation.goBack();
    }
    return (
        <EditData title={'修改用户名'} handler={handleSave}>
            <Input
                placeholder={"请输入用户名"}
                onBlur={handleNameBlur}
                value={userName.value}
                errorMessage={userName.errorMessage}
                onChangeText={(text) => {
                    setUserName({...userName, value: text})
                }}
                style={{
                    color: Color.basic
                }}
            ></Input>
        </EditData>
    );
};