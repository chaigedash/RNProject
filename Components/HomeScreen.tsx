import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Animated} from "react-native";
import * as React from "react";
import {Color} from "../Constant/Theme.ts";
import {useEffect, useRef, useState} from "react";
import {useAnimatedStyle} from "react-native-reanimated";
import {AnimatedView} from "react-native-reanimated/lib/typescript/component/View";
import {Button} from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const contentEdge = 200;
const screenWidth = Dimensions.get('window').width;
export const HomeScreen = () => {
    const flipAnim = useRef(new Animated.Value(0)).current;
    const translateXArrowAnim = useRef(new Animated.Value(0.5 * (screenWidth + contentEdge))).current;
    const translateXContentAnim = useRef(new Animated.Value(0.5 * (screenWidth - contentEdge))).current;
    const translateXDetailAnim = useRef(new Animated.Value(screenWidth)).current;
    const flippedArrowStyle = {
        transform: [
            {
                scaleX:
                    flipAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, -1]
                    })
            },
            {
                translateX: translateXArrowAnim
            }
        ],
    };
    const moveContentStyle = {
        transform: [{translateX: translateXContentAnim}],
    };
    const moveDetailContentStyle = {
        transform: [{translateX: translateXDetailAnim}],
    }
    const [showDetails, setShowDetails] = useState(false);
    const handlePressArrow = () => {
        setShowDetails((prevState) => !prevState);
        if (showDetails) {
            Animated.sequence([
                Animated.timing(flipAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.parallel([
                    Animated.timing(translateXArrowAnim, {
                        toValue: 0.5*(screenWidth + contentEdge),
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateXContentAnim, {
                        toValue: 0.5*(screenWidth - contentEdge),
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateXDetailAnim, {
                        toValue: screenWidth,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start();
        }
        else {
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(translateXArrowAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateXContentAnim, {
                        toValue: -contentEdge,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateXDetailAnim, {
                        toValue: 0.5 * (screenWidth - contentEdge),
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(flipAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentWrapper}>
                <Animated.View style={[styles.content, moveContentStyle]}>
                    {
                        "低空经济".split("").map(letter => {
                            return (
                                <Text style={styles.titleText} key={letter}>{letter}</Text>
                            )
                        })
                    }
                </Animated.View>
                <TouchableOpacity style={{
                    position: "absolute",
                }}
                    onPress={handlePressArrow}>
                    <Animated.View style={[styles.arrow, flippedArrowStyle]}></Animated.View>
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.content, moveDetailContentStyle, {position: 'absolute'}]}>
                <Text style={styles.detailText}>
                    低空经济（Low-altitude Economy）是以低空飞行活动为核心，以无人驾驶飞行、低空智联网等技术组成的新质生产力与空域、市场等要素相互作用，带动低空基础设施、低空飞行器制造、低空运营服务和低空飞行保障等领域发展的综合性经济形态。
                </Text>
            </Animated.View>
        </View>
    );
};
const styles= StyleSheet.create({
    mainContainer: {
        height: '100%',
        justifyContent: 'center',
    },
    contentWrapper: {
        width: '100%',
        flexDirection: 'row',
    },
    content: {
        borderRadius: 20,
        backgroundColor: Color.primary,
        minHeight: contentEdge,
        width: contentEdge,
        flexDirection: 'row',
        flexWrap: "wrap",
        // transform: [{translateX: 0.5 * (screenWidth - contentEdge)}],
    },
    titleText: {
        width: 100,
        textAlign: 'center',
        fontSize: 70,
        fontWeight: 'bold',
        color: Color.light,
    },
    detailText: {
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
        color: Color.light,
    },
    arrow: {
        marginLeft: 10,
        borderLeftWidth: 50,
        borderLeftColor: Color.primary,
        borderTopWidth: 0.5*contentEdge - 20,
        borderTopColor: 'transparent',
        borderBottomWidth: 0.5*contentEdge - 20,
        borderBottomColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        // transform: [{translateX: 0.5*(screenWidth + contentEdge)}],
    },
});