import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Route} from "../Constant/Enums.ts";
import {EvaluationMainScreen} from "./Evaluation/EvaluationMainScreen.tsx";
import {EvaluationDetailScreen} from "./Evaluation/EvaluationDetailScreen.tsx";
import {EvaluationResultScreen} from "./Evaluation/EvaluationResultScreen.tsx";
import {ChooseQuestionTypeScreen} from "./Evaluation/CreateQuestion/ChooseQuestionTypeScreen.tsx";
import {CreateGapFillingScreen} from "./Evaluation/CreateQuestion/CreateGapFillingScreen.tsx";
import {CreateMultipleChoiceScreen} from "./Evaluation/CreateQuestion/CreateMultipleChoiceScreen.tsx";
import {CreateTrueOrFalseScreen} from "./Evaluation/CreateQuestion/CreateTrueOrFalseScreen.tsx";

const Stack = createNativeStackNavigator();
export const EvaluationNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={Route.EvaluationMain} component={EvaluationMainScreen}></Stack.Screen>
            <Stack.Screen name={Route.EvaluationDetail} component={EvaluationDetailScreen}></Stack.Screen>
            <Stack.Screen name={Route.EvaluationResult} component={EvaluationResultScreen}></Stack.Screen>
            <Stack.Screen name={Route.ChooseQuestionType} component={ChooseQuestionTypeScreen}></Stack.Screen>
            <Stack.Screen name={Route.CreateGapFilling} component={CreateGapFillingScreen}></Stack.Screen>
            <Stack.Screen name={Route.CreateMultipleChoice} component={CreateMultipleChoiceScreen}></Stack.Screen>
            <Stack.Screen name={Route.CreateTrueOrFalse} component={CreateTrueOrFalseScreen}></Stack.Screen>
        </Stack.Navigator>
    );
};