import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Route} from "../Constant/Enums.ts";
import {StatisticsMainScreen} from "./Statistics/StatisticsMainScreen.tsx";

const Stack = createNativeStackNavigator();
export const StatisticsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={Route.StatisticsMain} component={StatisticsMainScreen}></Stack.Screen>
        </Stack.Navigator>
    );
};