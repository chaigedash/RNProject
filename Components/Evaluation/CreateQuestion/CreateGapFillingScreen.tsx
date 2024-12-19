import {View, StyleSheet, Text, TouchableOpacity, ToastAndroid} from "react-native";
import {GapFilling} from "../Question/GapFilling.tsx";
import {useEffect, useState} from "react";
import {gapFillingQuestionType} from "../../../Constant/Type.ts";
import {QuestionType} from "../../../Constant/Enums.ts";
import {Button, Input} from "@rneui/base";
import {Overlay} from "@rneui/themed";
import {Color, globalStyles} from "../../../Constant/Theme.ts";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const CreateGapFillingScreen = () => {
    const [questionData, setQuestionData] = useState<gapFillingQuestionType>({
        id: '',
        type: null,
        title: [],
        correctAnswer: [],
    });
    const [questionOverlayVisible, setQuestionOverlayVisible] = useState(false);
    const [gapOverlayVisible, setGapOverlayVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleWithdraw = () => {
        if (questionData.title.length == 0) {
            ToastAndroid.show('暂无可撤回的内容', ToastAndroid.SHORT);
        }
        else if (questionData.correctAnswer.length == questionData.title.length) {
            //     撤回一个空
            setQuestionData(prevState => {
                return {
                    ...prevState,
                    correctAnswer: prevState.correctAnswer.slice(0, prevState.correctAnswer.length-1)
                }
            })
        }
        else {
            //     撤回一个题干
            setQuestionData(prevState => {
                return {
                    ...prevState,
                    title: prevState.title.slice(0, prevState.title.length-1)
                }
            })
        }
    }
    const handleSubmitGap = () => {
        if (questionData.title.length == 0) {
            setQuestionData((prevState) => {
                return {
                    ...prevState,
                    title: [''],
                    correctAnswer: prevState.correctAnswer.concat(inputValue)
                }
            })
        }
        else setQuestionData((prevState) => {
            return {
                ...prevState,
                correctAnswer: prevState.correctAnswer.concat(inputValue)
            }
        })
        setGapOverlayVisible(false);
    }
    const handleSubmitQuestion = () => {
        setQuestionData((prevState) => {
            return {
                ...prevState,
                title: prevState.title.concat(inputValue)
            }
        })
        setQuestionOverlayVisible(false);    }
    return (
        <>
            <View style={styles.mainContainer}>
                <View>
                    <Text>预览</Text>
                    <GapFilling
                        editable={false}
                        question={questionData.title}
                        finishedAnswer={questionData.correctAnswer}
                        correctAnswer={questionData.correctAnswer}
                        instantCheck={false}
                    ></GapFilling>
                </View>
                <View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => {
                            if (questionData.correctAnswer.length != questionData.title.length) {
                                ToastAndroid.show('请先挖空', ToastAndroid.SHORT);
                            }
                            else setQuestionOverlayVisible(true)
                        }}>
                            <View style={[styles.button, {
                                marginRight: 50,
                                backgroundColor: Color.primary
                            }]}>
                                <Text style={[
                                    globalStyles.centerText,
                                    styles.buttonText, {
                                        color: Color.light
                                    }
                                ]}>
                                    <FontAwesome name={'plus'} size={20}></FontAwesome>
                                    <View style={{width: 5}}></View>
                                    题干
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (questionData.title.length != 0 &&
                                questionData.correctAnswer.length == questionData.title.length) {
                                ToastAndroid.show('请先完善题干', ToastAndroid.SHORT);
                            }
                            else setGapOverlayVisible(true);
                        }}>
                            <View style={[styles.button, {
                                backgroundColor: Color.light,
                            }
                            ]}>
                                <Text style={[
                                    globalStyles.centerText,
                                    styles.buttonText, {
                                        color: Color.primary
                                    }]}>
                                    <FontAwesome name={'cut'} size={20}></FontAwesome>
                                    <View style={{width: 5}}></View>
                                    挖空
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Button buttonStyle={{
                        backgroundColor: Color.primary,
                        borderRadius: 5,
                    }} title={'撤回'} onPress={handleWithdraw}></Button>
                </View>
            </View>
            <Overlay isVisible={questionOverlayVisible} overlayStyle={styles.overlayContainer}>
                <Input
                    onChangeText={(text: string) => {
                        setInputValue(text);
                    }}
                    placeholder={'请输入题干碎片'}
                ></Input>
                <TouchableOpacity style={styles.closeIconWrapper} onPress={() => setQuestionOverlayVisible(false)}>
                    <FontAwesome style={styles.closeIcon} name={'close'}></FontAwesome>
                </TouchableOpacity>
                <Button onPress={handleSubmitQuestion} title={'提交'}></Button>
            </Overlay>
            <Overlay isVisible={gapOverlayVisible} overlayStyle={styles.overlayContainer}>
                <Input
                    onChangeText={(text: string) => {
                        setInputValue(text);
                    }}
                    placeholder={'请输入本空答案'}
                ></Input>
                <TouchableOpacity style={styles.closeIconWrapper} onPress={() => setGapOverlayVisible(false)}>
                    <FontAwesome style={styles.closeIcon} name={'close'}></FontAwesome>
                </TouchableOpacity>
                <Button onPress={handleSubmitGap} title={'提交'}></Button>
            </Overlay>
        </>

    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 'auto',
        marginVertical: 20,
    },
    button: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Color.primary,
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 500,
    },
    textPrimary: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20,
    },
    textSecondary: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 17,
    },
    closeIconWrapper: {
        position: 'absolute',
        top: -10,
        right: -10,
    },
    closeIcon: {
        backgroundColor: Color.primary,
        color: Color.light,
        height: 20,
        width: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 10,
    },
    overlayContainer: {
        marginHorizontal: 20,
    },
})