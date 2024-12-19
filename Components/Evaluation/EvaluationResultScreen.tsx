import {QuestionType} from "../../Constant/Enums.ts";
import {TrueOrFalse} from "./Question/TrueOrFalse.tsx";
import {gapFillingQuestionType, multipleChoiceQuestionType, trueOrFalseQuestionType} from "../../Constant/Type.ts";
import {MultipleChoice} from "./Question/MultipleChoice.tsx";
import {GapFilling} from "./Question/GapFilling.tsx";
import React, {useEffect, useState} from "react";
import {ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";

export const EvaluationResultScreen: React.FC<{route: any}> = ({route}) => {
    const [evaluationId, setEvaluationId] = useState();
    const navigation = useNavigation();
    const [checkList, setCheckList] = useState<boolean[]>([]);
    const [questionData, setQuestionData] = useState<(gapFillingQuestionType | multipleChoiceQuestionType | trueOrFalseQuestionType)[]>([]);
    const [answerList, setAnswerList] = useState<(boolean | string[])[]>([]);
    useEffect(() => {
        if (route.params.evaluationId) {
            setEvaluationId(route.params.evaluationId);
            // TODO：向后端发起数据请求
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
                    type: QuestionType.trueOrFalse,
                    title: 'QuestionTrueOrFalse',
                    correctAnswer: false,
                },
                {
                    id: '4',
                    type: QuestionType.multipleChoice,
                    title: 'QuestionSimpleChoice',
                    answerList: ['aaa', 'bbb', 'ccc', 'ddd'],
                    correctAnswer: ['aaa'],
                },
                {
                    id: '5',
                    type: QuestionType.multipleChoice,
                    title: 'QuestionMultipleChoice',
                    answerList: ['aaa', 'bbb', 'ccc', 'ddd'],
                    correctAnswer: ['aaa', 'bbb'],
                }
            ])
            setAnswerList([
                ['ea', 'p'], false, false, ['aaa'], ['aaa', 'bbb']
            ])
        }
    }, [route.params]);
    return (
        <ScrollView>
            {
                questionData.map((questionDatum, index) => {
                    switch (questionDatum.type) {
                        case QuestionType.trueOrFalse:
                            return <TrueOrFalse
                                key={questionDatum.id}
                                editable={false}
                                question={(questionDatum as trueOrFalseQuestionType).title}
                                finishedAnswer={answerList[index] as boolean}
                                correctAnswer={(questionDatum as trueOrFalseQuestionType).correctAnswer}
                                instantCheck={true}
                            ></TrueOrFalse>;
                        case QuestionType.multipleChoice:
                            return <MultipleChoice
                                key={questionDatum.id}
                                editable={false}
                                question={(questionDatum as multipleChoiceQuestionType).title}
                                answerList={(questionDatum as multipleChoiceQuestionType).answerList}
                                finishedAnswer={answerList[index] as string[]}
                                correctAnswer={(questionDatum as multipleChoiceQuestionType).correctAnswer}
                                instantCheck={true}
                            ></MultipleChoice>
                        case QuestionType.gapFilling:
                            return <GapFilling
                                key={questionDatum.id}
                                editable={false}
                                question={(questionDatum as gapFillingQuestionType).title}
                                finishedAnswer={answerList[index] as string[]}
                                correctAnswer={(questionDatum as gapFillingQuestionType).correctAnswer}
                                instantCheck={true}
                            ></GapFilling>
                    }
                })
            }
        </ScrollView>
    );
};