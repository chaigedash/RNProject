import {ToastAndroid} from "react-native";
import {Color} from "../../../Constant/Theme.ts";
import {Input} from "@rneui/base";
import React, {useEffect, useState} from "react";
import {inputType} from "../../../Constant/Type.ts";
import {useNavigation} from "@react-navigation/native";
import {User} from "../../../Constant/UserStorage.ts";
import {EditData} from "../../common/EditData.tsx";

export const UserMajorScreen = () => {
    const [userMajor, setUserMajor] = useState<inputType>({
        value: 'unknown',
        errorMessage: '',
    });
    const navigation = useNavigation();
    useEffect(() => {
        setUserMajor({...userMajor, value: User.getInstance().getUserData().major});
    }, [navigation.isFocused()]);
    const handleSave = () => {
        ToastAndroid.show('保存成功', ToastAndroid.SHORT);
        User.getInstance().setUserData({
            ...User.getInstance().getUserData(),
            major: userMajor.value,
        })
        navigation.goBack();
    }
    return (
        <EditData title={'修改专业'} handler={handleSave}>
            <Input
                placeholder={"请输入专业"}
                value={userMajor.value}
                errorMessage={userMajor.errorMessage}
                onChangeText={(text) => {
                    setUserMajor({...userMajor, value: text})
                }}
                style={{
                    color: Color.basic
                }}
            ></Input>
        </EditData>
    );
};