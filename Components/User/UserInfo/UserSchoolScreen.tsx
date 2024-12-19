import {ToastAndroid} from "react-native";
import {Color} from "../../../Constant/Theme.ts";
import {Input} from "@rneui/base";
import React, {useEffect, useState} from "react";
import {inputType} from "../../../Constant/Type.ts";
import {useNavigation} from "@react-navigation/native";
import {User} from "../../../Constant/UserStorage.ts";
import {EditData} from "../../common/EditData.tsx";

export const UserSchoolScreen = () => {
    const [userSchool, setUserSchool] = useState<inputType>({
        value: 'unknown',
        errorMessage: '',
    });
    const navigation = useNavigation();
    useEffect(() => {
        setUserSchool({...userSchool, value: User.getInstance().getUserData().school});
    }, [navigation.isFocused()]);
    const handleSave = () => {
        ToastAndroid.show('保存成功', ToastAndroid.SHORT);
        User.getInstance().setUserData({
            ...User.getInstance().getUserData(),
            school: userSchool.value,
        })
        navigation.goBack();
    }
    return (
        <EditData title={'修改学校'} handler={handleSave}>
            <Input
                placeholder={"请输入学校"}
                value={userSchool.value}
                errorMessage={userSchool.errorMessage}
                onChangeText={(text) => {
                    setUserSchool({...userSchool, value: text})
                }}
                style={{
                    color: Color.basic
                }}
            ></Input>
        </EditData>
    );
};