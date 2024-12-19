import {StyleSheet, Text, TextInput, View} from "react-native";
import {Color, globalStyles} from "../../../Constant/Theme.ts";
import {Button, Card, Icon, Input} from "@rneui/base";
import React, {useEffect, useState} from "react";
import {CheckBlock} from "./CheckBlock.tsx";

export const GapFilling = (
    props: {
        editable: boolean,
        question: string[],
        finishedAnswer: string[],
        correctAnswer: string[],
        instantCheck: boolean,
        handler?: (check: boolean, answer: string[]) => any
    }) => {
    const [filledAnswer, setFilledAnswer] = useState<string[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 是否正确
    const handleInput = (index: number, text: string) => {
        setFilledAnswer((prevState: string[]) => {
            const nextState = prevState;
            nextState[index] = text;
            const isCorrect = checkAnswers(nextState);
            props.instantCheck && setIsCorrect(isCorrect);
            props.handler && props.handler(isCorrect, nextState);
            return nextState;
        })
    }
    const checkAnswers = (userAnswers: string[]): boolean => {
        // 顺序有关比较
        return (
            JSON.stringify(userAnswers) === JSON.stringify(props.correctAnswer)
        );
    };
    useEffect(() => {
        props.instantCheck && setIsCorrect(checkAnswers(props.finishedAnswer));
    }, []);
    return (
        <Card containerStyle={styles.card}>
            <Card.Title>{
                props.question.map((questionPiece, index) => {
                    if (props.correctAnswer.length == props.question.length-1 &&
                        index == props.question.length - 1) {
                        return (
                            <View
                                key={`_${index}`}
                                style={{
                                    height:25,
                                    flexDirection: 'row',
                            }}>
                                <Text style={[globalStyles.secondaryText, {
                                    height: '100%',
                                    textAlignVertical: 'bottom',
                                }]}>{questionPiece}</Text>
                            </View>
                        )
                    }
                    else return (
                        <View
                            key={`_${index}`}
                            style={{
                                height:25,
                                flexDirection: 'row',
                            }}>
                            <Text style={[globalStyles.secondaryText, {
                                height: '100%',
                                textAlignVertical: 'bottom',
                            }]}>{questionPiece}</Text>
                            <TextInput
                                value={props.finishedAnswer[index]}
                                editable={props.editable}
                                onChangeText={(text: string) => handleInput(index, text)}
                                style={{
                                    width: props.correctAnswer[index].length * 10 + 20, // 设置输入框的宽度
                                    borderBottomWidth: 1, // 添加底部边框
                                    height: '100%',
                                    textAlignVertical: 'bottom',
                                    paddingBottom: 0,
                                    color: Color.basic,
                                    paddingHorizontal: 5,
                                }}
                            />
                        </View>
                    )

                })
            }</Card.Title>
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
    buttonGroupContainer: {
        marginTop: 16,
    },
    buttonGroup: {
        borderRadius: 8,
    },
    selectedButton: {
        backgroundColor: Color.primary,
    },
    buttonText: {
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