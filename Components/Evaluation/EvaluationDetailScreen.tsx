import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {ScrollView, View, StyleSheet, Text} from "react-native";
import {TrueOrFalse} from "./Question/TrueOrFalse.tsx";
import {gapFillingQuestionType, multipleChoiceQuestionType, trueOrFalseQuestionType} from "../../Constant/Type.ts";
import {QuestionType, Route} from "../../Constant/Enums.ts";
import {MultipleChoice} from "./Question/MultipleChoice.tsx";
import {GapFilling} from "./Question/GapFilling.tsx";
import {Button} from "@rneui/base";
import {Color} from "../../Constant/Theme.ts";

export const EvaluationDetailScreen: React.FC<{route: any}> = ({route}) => {
    const [evaluationId, setEvaluationId] = useState();
    const navigation = useNavigation();
    const [checkList, setCheckList] = useState<boolean[]>([]);
    const [questionData, setQuestionData] = useState<(gapFillingQuestionType | multipleChoiceQuestionType | trueOrFalseQuestionType)[]>([]);
    const [answerList, setAnswerList] = useState<(boolean | string[])[]>([]);
    useEffect(() => {
        if (route.params.evaluationId) {
            setEvaluationId(route.params.evaluationId);
            // TODO：数据结构设计和前端展示
            // TODO：向后端发起数据请求
            // TODO: 考虑是否添加保留做题记录的功能 - finishedAnswer
            setQuestionData([
                {
                    id: '1',
                    type: QuestionType.gapFilling,
                    title: ['Qu', 'stionGa', 'Filling'],
                    correctAnswer: ['e', 'p'],
                },
                {
                    id: '2',
                    type: QuestionType.trueOrFalse,
                    title: 'QuestionTrueOrFalse',
                    correctAnswer: true,
                },
                {
                    id: '3',
                    type: QuestionType.multipleChoice,
                    title: 'QuestionSimpleChoice',
                    answerList: ['aaa', 'bbb', 'ccc', 'ddd'],
                    correctAnswer: ['aaa'],
                },
                {
                    id: '4',
                    type: QuestionType.multipleChoice,
                    title: 'QuestionMultipleChoice',
                    answerList: ['aaa', 'bbb', 'ccc', 'ddd'],
                    correctAnswer: ['aaa', 'bbb'],
                }
            ])
        }
    }, [route.params]);
    const handleCheck = (index: number, check: boolean, answer: (boolean | string[])) => {
        setCheckList((prevState) => {
            const nextState = prevState;
            nextState[index] = check;
            return nextState;
        })
        setAnswerList((prevState) => {
            const nextState = prevState;
            nextState[index] = answer;
            return nextState;
        })
    }
    return (
        <ScrollView>
            {
                questionData.map((questionDatum, index) => {
                    switch (questionDatum.type) {
                        case QuestionType.trueOrFalse:
                            return <TrueOrFalse
                                key={questionDatum.id}
                                editable={true}
                                question={(questionDatum as trueOrFalseQuestionType).title}
                                finishedAnswer={null}
                                correctAnswer={(questionDatum as trueOrFalseQuestionType).correctAnswer}
                                instantCheck={false}
                                handler={handleCheck.bind(this, index)}
                            ></TrueOrFalse>;
                        case QuestionType.multipleChoice:
                            return <MultipleChoice
                                key={questionDatum.id}
                                editable={true}
                                question={(questionDatum as multipleChoiceQuestionType).title}
                                answerList={(questionDatum as multipleChoiceQuestionType).answerList}
                                finishedAnswer={[]}
                                correctAnswer={(questionDatum as multipleChoiceQuestionType).correctAnswer}
                                instantCheck={false}
                                handler={handleCheck.bind(this, index)}
                            ></MultipleChoice>
                        case QuestionType.gapFilling:
                            return <GapFilling
                                key={questionDatum.id}
                                editable={true}
                                question={(questionDatum as gapFillingQuestionType).title}
                                finishedAnswer={[]}
                                correctAnswer={(questionDatum as gapFillingQuestionType).correctAnswer}
                                instantCheck={false}
                                handler={handleCheck.bind(this, index)}
                            ></GapFilling>
                    }
                })
            }
            <Button
                title={'提交'}
                containerStyle={styles.submitButton}
                onPress={() => {
                    navigation.navigate(Route.EvaluationResult, {evaluationId: evaluationId});
                }}
            ></Button>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    submitButton: {
        marginVertical: 20,
        marginHorizontal: 16,
        borderRadius: 5,
    }
})