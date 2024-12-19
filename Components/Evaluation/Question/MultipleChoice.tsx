import {Button, Card, CheckBox, Icon} from "@rneui/base";
import {View, Text, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {Color} from "../../../Constant/Theme.ts";
import {CheckBlock} from "./CheckBlock.tsx";

export const MultipleChoice = (
    props: {
        editable: boolean,
        question: string,
        answerList: string[],
        finishedAnswer: string[],
        correctAnswer: string[],
        instantCheck: boolean,
        handler?: (check: boolean, answer: string[]) => any
    }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]); // 用户选择的答案
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 是否正确

    // 处理用户选择
    const handleAnswer = (answer: string) => {
        let newSelectedAnswers: string[] = [];
        if (props.correctAnswer.length == 1) {
            // 减少重新渲染, state本身的机制是浅比较
            if (selectedAnswers.includes(answer)) return;
            else newSelectedAnswers = [answer];
        }
        else {
            if (selectedAnswers.includes(answer)) {
                // 如果已经选中，取消选择
                newSelectedAnswers = selectedAnswers.filter((item) => item !== answer);
            } else {
                // 如果没有选中，添加选择
                newSelectedAnswers = [...selectedAnswers, answer];
            }
        }
        const isCorrect = checkAnswers(newSelectedAnswers);
        props.handler && props.handler(isCorrect, newSelectedAnswers);
        setSelectedAnswers(newSelectedAnswers);
        props.instantCheck && setIsCorrect(isCorrect);
    };
    // 检查答案是否正确
    const checkAnswers = (userAnswers: string[]): boolean => {
        // 顺序无关比较
        return (
            JSON.stringify(userAnswers.sort()) === JSON.stringify(props.correctAnswer.sort())
        );
    };
    useEffect(() => {
        props.instantCheck && setIsCorrect(checkAnswers(props.finishedAnswer))
    }, []);
    return (
        <Card containerStyle={styles.card}>
            <Card.Title style={styles.title}>{props.question}</Card.Title>
            <Card.Divider />
            <View style={styles.checkboxContainer}>
                {
                    props.answerList.map((answer, index) => {
                        if (props.correctAnswer.length == 1) {
                            return <CheckBox
                                disabled={!props.editable}
                                key={`_${index}`}
                                title={answer}
                                checked={props.finishedAnswer.includes(answer) || selectedAnswers.includes(answer)}
                                onPress={() => handleAnswer(answer)}
                                containerStyle={styles.checkbox}
                                textStyle={styles.checkboxText}
                                checkedIcon={'dot-circle-o'}
                                uncheckedIcon={'circle-o'}
                            />
                        }
                        else return <CheckBox
                            disabled={!props.editable}
                            key={`_${index}`}
                            title={answer}
                            checked={props.finishedAnswer.includes(answer) || selectedAnswers.includes(answer)}
                            onPress={() => handleAnswer(answer)}
                            containerStyle={styles.checkbox}
                            textStyle={styles.checkboxText}
                        />
                    })
                }
            </View>
            {
                isCorrect !== null &&
                <CheckBlock isCorrect={isCorrect}></CheckBlock>
            }
        </Card>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    card: {
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        marginTop: 16,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginLeft: 0,
        marginRight: 0,
    },
    checkboxText: {
        fontSize: 16,
    },
    resultContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    correctText: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
    },
    incorrectText: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
    },
});