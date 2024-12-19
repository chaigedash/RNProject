import {CreateQuestionTemplate} from "./CreateQuestionTemplate.tsx";
import {useState} from "react";
import {trueOrFalseQuestionType} from "../../../Constant/Type.ts";
import {QuestionType} from "../../../Constant/Enums.ts";
import {TrueOrFalse} from "../Question/TrueOrFalse.tsx";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Input} from "@rneui/base";
import {View} from "react-native";

export const CreateTrueOrFalseScreen = () => {
    const [questionData, setQuestionData] = useState<trueOrFalseQuestionType>({
        id: '',
        type: QuestionType.trueOrFalse,
        title: '',
        correctAnswer: null,
    })
    const [inputValue, setInputValue] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState<boolean| null>(null);
    return (
        <>
            <CreateQuestionTemplate
                preViewQuestion={
                    <TrueOrFalse
                        editable={false}
                        question={questionData.title}
                        finishedAnswer={questionData.correctAnswer}
                        correctAnswer={questionData.correctAnswer}
                        instantCheck={false}
                    ></TrueOrFalse>
                }
                buttons={[{
                    title: '题干',
                    icon: <FontAwesome name={'bell-o'} size={20}></FontAwesome>,
                    handler: () => true,
                }, {
                    title: '答案',
                    icon: <FontAwesome name={'key'} size={20}></FontAwesome>,
                    handler: () => true,
                }]}
                overlays={[
                    {
                        children: <Input
                            placeholder={'请输入题干'}
                            onChangeText={(text: string) => setInputValue(text)} />,
                        handler: () => {
                            setQuestionData({...questionData, title: inputValue});
                            setInputValue('');
                        }
                    }, {
                        children: <View style={{marginBottom: 20}}>
                            <TrueOrFalse
                                editable={true}
                                question={questionData.title}
                                finishedAnswer={null}
                                correctAnswer={null}
                                instantCheck={false}
                                handler={(check: boolean, answer: boolean) => {
                                    setSelectedAnswer(answer);
                                }}
                            ></TrueOrFalse>
                        </View>,
                        handler: () => {
                            setQuestionData({
                                ...questionData,
                                correctAnswer: selectedAnswer,
                            })
                        }

                    }
                ]}
            ></CreateQuestionTemplate>
        </>
    );
};