import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {Color, globalStyles} from "../../Constant/Theme.ts";
import {useEffect, useState} from "react";
import {evaluationBasicInfoType} from "../../Constant/Type.ts";
import {useNavigation} from "@react-navigation/native";
import {Difficulty, Route} from "../../Constant/Enums.ts";

export const EvaluationList = () => {
    // TODO: 接后端
    const [evaluationData, setEvaluationData] = useState<evaluationBasicInfoType[]>([]);
    const navigation = useNavigation()
    useEffect(() => {
        setEvaluationData([
            {
                id: '1',
                title: 'Eval1',
                difficulty: Difficulty.easy,
            },
            {
                id: '2',
                title: 'Eval2',
                difficulty: Difficulty.hard,
            }
        ])
    }, [navigation.isFocused()]);
    const handlePress = (evaluationId: string) => {
        navigation.navigate(Route.EvaluationDetail, {evaluationId: evaluationId});
    }
    return (
        <View>
            {
                evaluationData.map(el => {
                    return (
                        <TouchableOpacity
                            key={el.id}
                            onPress={() => handlePress(el.id)}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 10,
                            }}>
                                <Text style={globalStyles.titleText}>
                                    {el.title}
                                </Text>
                                <Text style={globalStyles.secondaryText}>
                                    {el.difficulty}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    );
};
export const EvaluationMainScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.mainContainer}>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    style={{
                        width: '50%',
                        marginRight: 5,
                    }}
                    onPress={() => navigation.navigate(Route.ChooseQuestionType)}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            创建试题
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '50%',
                        marginLeft: 5,
                    }}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            随机试题
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <EvaluationList></EvaluationList>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        height: 50,
        backgroundColor: Color.primary,
        borderRadius: 5,
    },
    buttonText: {
        color: Color.light,
        fontSize: 20,
        fontWeight: 500,
        height: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
    }
})