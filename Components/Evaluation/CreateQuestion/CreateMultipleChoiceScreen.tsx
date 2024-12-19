import {useState} from "react";
import {multipleChoiceQuestionType} from "../../../Constant/Type.ts";
import {QuestionType} from "../../../Constant/Enums.ts";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {MultipleChoice} from "../Question/MultipleChoice.tsx";
import {Color, globalStyles} from "../../../Constant/Theme.ts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {CreateQuestionTemplate} from "./CreateQuestionTemplate.tsx";
import {Button, Input} from "@rneui/base";

export const CreateMultipleChoiceScreen = () => {
    const [questionData, setQuestionData] = useState<multipleChoiceQuestionType>({
        id: '',
        type: QuestionType.multipleChoice,
        title: '',
        answerList: [],
        correctAnswer: [],
    });
    const [inputValue, setInputValue] = useState('');
    return (
        <>
            <CreateQuestionTemplate
                preViewQuestion={
                    <MultipleChoice
                        editable={false}
                        question={questionData.title}
                        answerList={questionData.answerList}
                        finishedAnswer={questionData.correctAnswer}
                        correctAnswer={questionData.correctAnswer}
                        instantCheck={false}
                    ></MultipleChoice>
                }
                buttons={[
                    {
                        title: '题干',
                        icon: <FontAwesome name={'bell-o'} size={20}></FontAwesome>,
                        handler: () => true,
                    },
                    {
                        title: '选项',
                        icon: <FontAwesome name={'lightbulb-o'} size={20}></FontAwesome>,
                        handler: () => true,
                    },
                    {
                        title: '答案',
                        icon: <FontAwesome name={'key'} size={20}></FontAwesome>,
                        handler: () => true,
                    },
                ]
                }
                overlays={[
                    {
                        children: <Input
                            placeholder={'请输入题干'}
                            onChangeText={(text: string) => setInputValue(text)} />,
                        handler: () => {
                            setQuestionData({...questionData, title: inputValue});
                            setInputValue('');
                        },
                    },
                    {
                        children: <Input
                            placeholder={'请输入选项'}
                            onChangeText={(text: string) => setInputValue(text)} />,
                        handler: () => {
                            setQuestionData({...questionData, answerList: questionData.answerList.concat(inputValue)});
                            setInputValue('');
                        },
                    },
                    {
                        children: <View style={{marginBottom: 20}}>
                                <MultipleChoice
                                editable={true}
                                question={questionData.title}
                                answerList={questionData.answerList}
                                finishedAnswer={[]}
                                correctAnswer={[]}
                                instantCheck={false}
                                handler={(check: boolean, answer: string[]) => {
                                    setQuestionData({
                                        ...questionData,
                                        correctAnswer: answer,
                                    })
                                }}/>
                            </View>,
                        handler: () => {}
                    }
                ]}
            ></CreateQuestionTemplate>
        </>
    );
};
const styles = StyleSheet.create({
})