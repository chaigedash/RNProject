import {Text, View, StyleSheet} from "react-native";
import {Icon} from "@rneui/base";
import React from "react";

export const CheckBlock = (props: {isCorrect: boolean}) => {
    return (
        <View style={styles.resultContainer}>
            {props.isCorrect ? (
                <Text style={styles.correctText}>
                    <Icon name="check" type="material" color="green" /> Correct!
                </Text>
            ) : (
                <Text style={styles.incorrectText}>
                    <Icon name="close" type="material" color="red" /> Incorrect!
                </Text>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
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
})