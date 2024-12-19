import {StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import {GapFilling} from "../Question/GapFilling.tsx";
import {useState} from "react";
import {gapFillingQuestionType} from "../../../Constant/Type.ts";
import {QuestionType} from "../../../Constant/Enums.ts";
import {Button, Input} from "@rneui/base";
import {Overlay} from "@rneui/themed";
import {Color, globalStyles} from "../../../Constant/Theme.ts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {CreateQuestionTemplate} from "./CreateQuestionTemplate.tsx";

export const CreateGapFillingScreen = () => {
    const [questionData, setQuestionData] = useState<gapFillingQuestionType>({
        id: '',
        type: QuestionType.gapFilling,
        title: [],
        correctAnswer: [],
    });
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
            setQuestionData({
                ...questionData,
                title: [''],
                correctAnswer: questionData.correctAnswer.concat(inputValue)
            })
        }
        else setQuestionData({
            ...questionData,
            correctAnswer: questionData.correctAnswer.concat(inputValue)
        })
        setInputValue('');
    }
    const handleSubmitQuestion = () => {
        setQuestionData({
            ...questionData,
            title: questionData.title.concat(inputValue)
        })
        setInputValue('');
    }
    return (
        <>
            <CreateQuestionTemplate
                preViewQuestion={
                    <GapFilling
                        editable={false}
                        question={questionData.title}
                        finishedAnswer={questionData.correctAnswer}
                        correctAnswer={questionData.correctAnswer}
                        instantCheck={false}
                    ></GapFilling>
                }
                buttons={[
                    {
                        title: '题干',
                        icon: <FontAwesome name={'plus'} size={20}></FontAwesome>,
                        handler: () => {
                            if (questionData.correctAnswer.length != questionData.title.length) {
                                ToastAndroid.show('请先挖空', ToastAndroid.SHORT);
                                return false;
                            }
                            return true;
                        }
                    }, {
                        title: '挖空',
                        icon: <FontAwesome name={'cut'} size={20}></FontAwesome>,
                        handler: () => {
                            if (questionData.title.length != 0 &&
                                questionData.correctAnswer.length == questionData.title.length) {
                                ToastAndroid.show('请先完善题干', ToastAndroid.SHORT);
                                return false;
                            }
                            return true;
                        }
                    }
                ]}
                bottomButton={
                    <Button buttonStyle={{
                        backgroundColor: Color.primary,
                        borderRadius: 5,
                    }} title={'撤回'} onPress={handleWithdraw}></Button>
                }
                overlays={[
                    {
                        children: <Input
                            onChangeText={(text: string) => {
                                setInputValue(text);
                            }}
                            placeholder={'请输入题干碎片'}
                        ></Input>,
                        handler: handleSubmitQuestion
                    },{
                        children: <Input
                            onChangeText={(text: string) => {
                                setInputValue(text);
                            }}
                            placeholder={'请输入本空答案'}
                        ></Input>,
                        handler: handleSubmitGap
                    }
                ]}
            ></CreateQuestionTemplate>
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