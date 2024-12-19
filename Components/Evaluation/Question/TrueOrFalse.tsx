import {View, StyleSheet, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {ButtonGroup, Card, Icon} from "@rneui/base";
import {Color, globalStyles} from "../../../Constant/Theme.ts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {CheckBlock} from "./CheckBlock.tsx";

export const TrueOrFalse = (
    props: {
        editable: boolean,
        question: string,
        finishedAnswer: (null | boolean),
        correctAnswer: (boolean | null),
        instantCheck: boolean,
        handler?: (check: boolean, answer: boolean) => any,
    }) => {
    const [selectedIndex, setSelectedIndex] = useState<number|null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean|null>(null);
    const handleAnswer = (index: number) => {
        setSelectedIndex(index);
        const userAnswer = index === 0; // True is index 0, False is index 1
        const isAnswerCorrect = checkAnswer(userAnswer);
        props.handler && props.handler(isAnswerCorrect, userAnswer);
        props.instantCheck && setIsCorrect(isAnswerCorrect);
    };
    const checkAnswer = (answer: boolean) => {
        return answer === props.correctAnswer;
    }
    useEffect(() => {
        props.instantCheck && props.finishedAnswer !== null && setIsCorrect(checkAnswer(props.finishedAnswer))
    }, []);
    return (
        <Card containerStyle={styles.card}>
            <Card.Title style={globalStyles.titleText}>{props.question}</Card.Title>
            <View style={styles.buttonGroupContainer}>
                <ButtonGroup
                    disabled={!props.editable}
                    selectedIndexes={props.finishedAnswer == true ? [0] : (props.finishedAnswer == false ? [1] : undefined)}
                    buttons={[
                        <>
                            <FontAwesome name={'check'}></FontAwesome>
                            <Text>True</Text>
                        </>,
                        <>
                            <FontAwesome name={'close'}></FontAwesome>
                            <Text>False</Text>
                        </>,
                    ]}
                    selectedIndex={selectedIndex}
                    onPress={handleAnswer}
                    containerStyle={styles.buttonGroup}
                    selectedButtonStyle={styles.selectedButton}
                    textStyle={styles.buttonText}
                    disabledSelectedTextStyle={props.finishedAnswer == props.correctAnswer ? {
                        color: 'green'
                    }: {
                        color: 'red'
                    }}
                    disabledTextStyle={props.finishedAnswer == null ? {
                        color: Color.secondary
                    } : (
                        props.finishedAnswer == props.correctAnswer ? {
                            color: Color.secondary
                        } : {
                            color: 'green'
                        }
                    )}
                />
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
});