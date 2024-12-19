import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Color, globalStyles} from "../../../Constant/Theme.ts";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {BigButton} from "../../common/BigButton.tsx";
import {useNavigation} from "@react-navigation/native";
import {Route} from "../../../Constant/Enums.ts";

export const ChooseQuestionTypeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <Text style={[globalStyles.titleText, styles.title]}>请选择题目类型</Text>
            <BigButton
                leftIcon={<FontAwesome5Icon name={'clipboard'} size={30}/> }
                title={'填空题'}
                intro={'挖空'}
                handlePress={() => navigation.navigate(Route.CreateGapFilling)}
            ></BigButton>
            <BigButton
                leftIcon={<FontAwesome5Icon name={'clipboard-list'} size={30}/> }
                title={'选择题'}
                intro={'单选 | 多选'}
                handlePress={() => navigation.navigate(Route.CreateMultipleChoice)}
            ></BigButton>
            <BigButton
                leftIcon={<FontAwesome5Icon name={'clipboard-check'} size={30}/> }
                title={'判断题'}
                intro={''}
                handlePress={() => navigation.navigate(Route.CreateTrueOrFalse)}
            ></BigButton>
        </View>
    );
};
const styles =  StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        height: 100,
        position: 'absolute',
        top: 20,
        left: 20,
    },
})