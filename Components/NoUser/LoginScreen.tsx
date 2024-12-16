import {useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Button, Alert} from "react-native";
import {Color} from "../../Constant/Theme.ts";
import { Input, Button as ButtonRne} from "@rneui/base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {inputType, verifyType} from "../../Constant/Type.ts";
import {verifyName, verifyPassword} from "../../Utils/Verify.ts";
const Register = () => {
    type registerFormType = {
        name: inputType,
        password: inputType,
        repeatPassword: inputType,
    }
    const [formData, setFormData] = useState<registerFormType>({
        name: {
            value: '',
            errorMessage: '',
        },
        password: {
            value: '',
            errorMessage: '',
        },
        repeatPassword: {
            value: '',
            errorMessage: '',
        },
    });
    const [isPasswordInVisible, setIsPasswordInVisible] = useState(true);
    const [isRepeatPasswordInVisible, setIsRepeatPasswordInVisible] = useState(true);
    const handleNameBlur = () => {
        const verifyResult = verifyName(formData.name.value);
        verifyResult.success && setFormData({...formData, name: {...formData.name, errorMessage: verifyResult.message}});
    }
    const handlePasswordBlur = () => {
        const verifyResult = verifyPassword(formData.password.value);
        verifyResult.success && setFormData({...formData, password: {...formData.password, errorMessage: verifyResult.message}});
    }
    const handleRepeatPasswordBlur = () => {
        let err = '';
        if (formData.password.value != formData.repeatPassword.value) {
            err = '两次密码输入不一致';
            setFormData({...formData, repeatPassword: {...formData.repeatPassword, errorMessage: err}});
        }
    }
    const handleRegister = () => {
        if (
            verifyName(formData.name.value).success &&
            verifyPassword(formData.password.value).success &&
            formData.password.value == formData.repeatPassword.value
        ) {
        //     TODO: 后端通信
        }
        else {
        }
    }
    return (
        <View style={styles.contentWrapper}>
                <Text style={styles.titleText}>
                    注册
                </Text>
                <Input
                    placeholder={"请输入用户名"}
                    onBlur={handleNameBlur}
                    leftIcon={<FontAwesome name="user" style={styles.inputIcon} />}
                    errorMessage={formData.name.errorMessage}
                    onChangeText={(text) => {
                        setFormData({...formData, name: {...formData.name, value: text}})
                    }}
                ></Input>
                <Input
                    placeholder={"请输入密码"}
                    onBlur={handlePasswordBlur}
                    secureTextEntry={isPasswordInVisible}
                    leftIcon={<FontAwesome name="lock" style={styles.inputIcon} />}
                    rightIcon={
                        <TouchableOpacity onPress={() => {
                            setIsPasswordInVisible(!isPasswordInVisible)
                        }}>
                            <FontAwesome name="eye" style={styles.inputIcon} />
                        </TouchableOpacity>
                    }
                    errorMessage={formData.password.errorMessage}
                    onChangeText={(text) => {
                        setFormData({...formData, password: {...formData.password, value: text}})
                    }}
                ></Input>
                <Input
                    placeholder={"请确认密码"}
                    onBlur={handleRepeatPasswordBlur}
                    secureTextEntry={isRepeatPasswordInVisible}
                    leftIcon={<FontAwesome name="lock" style={styles.inputIcon} />}
                    rightIcon={
                        <TouchableOpacity onPress={() => {
                            setIsRepeatPasswordInVisible(!isRepeatPasswordInVisible)
                        }}>
                            <FontAwesome name="eye" style={styles.inputIcon} />
                        </TouchableOpacity>
                    }
                    errorMessage={formData.repeatPassword.errorMessage}
                    onChangeText={(text) => {
                        setFormData({...formData, repeatPassword: {...formData.repeatPassword, value: text}})
                    }}
                ></Input>
                <Button title="注册" onPress={handleRegister}></Button>
            </View>
    )
}
const Login = () => {
    type loginFormType = {
        name: inputType,
        password: inputType,
    }
    const [formData, setFormData] = useState<loginFormType>({
        name: {
            value: '',
            errorMessage: '',
        },
        password: {
            value: '',
            errorMessage: '',
        },
    });
    const [isPasswordInVisible, setIsPasswordInVisible] = useState(true);
    const handleNameBlur = () => {
        let err = '';
        const curName = formData.name.value;
        if (!curName) err = '用户名不应为空';
        setFormData({...formData, name: {...formData.name, errorMessage: err}});
    }
    const handlePasswordBlur = () => {
        let err = '';
        const curPwd = formData.password.value;
        if (!curPwd) err = '密码不应为空';
        setFormData({...formData, password: {...formData.password, errorMessage: err}});
    }
    const handleLogin = () => {}
    return (
        <View style={styles.contentWrapper}>
                <Text style={styles.titleText}>
                    登录
                </Text>
                <Input
                    placeholder={"请输入用户名"}
                    onBlur={handleNameBlur}
                    leftIcon={<FontAwesome name="user" style={styles.inputIcon} />}
                    errorMessage={formData.name.errorMessage}
                    onChangeText={(text) => {
                        setFormData({...formData, name: {...formData.name, value: text}})
                    }}
                ></Input>
                <Input
                    placeholder={"请输入密码"}
                    onBlur={handlePasswordBlur}
                    secureTextEntry={isPasswordInVisible}
                    leftIcon={<FontAwesome name="lock" style={styles.inputIcon} />}
                    rightIcon={
                        <TouchableOpacity onPress={() => {
                            setIsPasswordInVisible(!isPasswordInVisible)
                        }}>
                            <FontAwesome name="eye" style={styles.inputIcon} />
                        </TouchableOpacity>
                    }
                    errorMessage={formData.password.errorMessage}
                    onChangeText={(text) => {
                        setFormData({...formData, password: {...formData.password, value: text}})
                    }}
                ></Input>
                <ButtonRne
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    title="Clear Button"
                    type="clear"
                    titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
                />
                <Button title="登录" onPress={handleLogin}></Button>
    </View>
    )
}
export const LoginScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <View style={styles.mainContainer}>
            {
                isLogin ? <Login></Login> : <Register></Register>
            }
            <View style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
            }}>
                <ButtonRne
                    type={'clear'}
                    containerStyle={{
                    }}
                    title={isLogin ? '跳转到注册' : '已有帐号? 去登录'}
                    onPress={() => setIsLogin(!isLogin)}
                ></ButtonRne>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Color.light,
        alignItems: "center",
        justifyContent: "center",
    },
    contentWrapper: {
        // backgroundColor: Color.primary,
        height: 300,
        width: 300,
    },
    titleText: {
        fontSize:30,
        color: Color.primary,
        marginBottom: 20,
    },
    inputIcon: {
        fontSize: 20,
        color: Color.primary,
    }
})