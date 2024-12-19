import {Text, View, StyleSheet} from "react-native";
import {Button} from "@rneui/base";
import {Color} from "../../Constant/Theme.ts";
import React, {ReactNode} from "react";

export const EditData = (props: {children: ReactNode, title: string, handler: (params: any) => any}) => {
    return (
        <View>
            <View style={styles.headWrapper}>
                <Text style={styles.titleText}>
                    {props.title}
                </Text>
                <Button
                    title="保存"
                    containerStyle={{
                        position: 'absolute',
                        top: 15,
                        right: 20,
                    }}
                    buttonStyle={{
                        borderRadius: 5,
                        padding: 5,
                    }}
                    color={Color.primary}
                    onPress={props.handler}
                ></Button>
            </View>
            {props.children}

        </View>
    );
};
const styles = StyleSheet.create({
    headWrapper: {
        paddingVertical:15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 500,
        color: Color.basic
    },
    inputIcon: {}
})