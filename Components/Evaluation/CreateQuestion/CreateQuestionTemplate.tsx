import {Dimensions, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import {Color, globalStyles} from "../../../Constant/Theme.ts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {GapFilling} from "../Question/GapFilling.tsx";
import {Button, Input} from "@rneui/base";
import {Overlay} from "@rneui/themed";
import {useEffect, useState} from "react";

export const CreateQuestionTemplate = (props: {
    preViewQuestion: any,
    buttons: {
        title: string,
        icon: any,
        handler: () => boolean;
    }[],
    overlays: {
        children: any,
        handler: () => any,
    }[],
    bottomButton?: any,
}) => {
    const [overlaysVisible, setOverlaysVisible] = useState<boolean[]>([]);
    useEffect(() => {
        setOverlaysVisible(Array(props.overlays.length).fill(false));
    }, []);
    return (
        <>
            <View style={styles.mainContainer}>
                <View>
                    <Text>预览</Text>
                    {props.preViewQuestion}
                </View>
                <View>
                    <View style={styles.buttonContainer}>
                        {
                            props.buttons.map((button, index) => {
                                return <TouchableOpacity
                                    key={`_${index}`}
                                    onPress={() => {
                                        const next = props.buttons[index].handler();
                                        next && setOverlaysVisible(prevState => {
                                            let nextState = [...prevState];
                                            nextState[index] = true;
                                            return nextState;
                                        })
                                    }}
                                    style={index !== props.buttons.length - 1 && {
                                        marginRight: 20,
                                    }}
                                >
                                    <View style={[styles.button, {
                                        backgroundColor: Color.primary
                                    }]}>
                                        <Text style={[
                                            globalStyles.centerText,
                                            styles.buttonText, {
                                                color: Color.light
                                            }
                                        ]}>
                                            {button.icon}
                                            <View style={{width: 5}}></View>
                                            {button.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                    {props.bottomButton && props.bottomButton}
                </View>
            </View>
            {
                overlaysVisible.map((isOverlayVisible, index) => {
                    return (
                        <Overlay isVisible={isOverlayVisible} overlayStyle={styles.overlayContainer}>
                            {props.overlays[index].children}
                            <TouchableOpacity
                                style={styles.closeIconWrapper}
                                onPress={() => setOverlaysVisible(prevState => {
                                    let nextState = [...prevState];
                                    nextState[index] = false;
                                    return nextState;
                                })}>
                                <FontAwesome style={styles.closeIcon} name={'close'}></FontAwesome>
                            </TouchableOpacity>
                            <Button
                                color={Color.primary}
                                onPress={() => {
                                    setOverlaysVisible(prevState => {
                                        let nextState = [...prevState];
                                        nextState[index] = false;
                                        return nextState;
                                    });
                                    props.overlays[index].handler()
                            }} title={'提交'}></Button>
                        </Overlay>
                    )

                })
            }
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
        width: Dimensions.get('window').width - 40,
    },
})