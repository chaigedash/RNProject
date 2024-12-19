import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Route} from "../Constant/Enums.ts";
import {ResourceMainScreen} from "./Resource/ResourceMainScreen.tsx";
import {UploadResourceScreen} from "./Resource/UploadResourceScreen.tsx";
import {ResourceDetailScreen} from "./Resource/ResourceDetailScreen.tsx";
import {ResourceEditScreen} from "./Resource/ResourceEditScreen.tsx";

const Stack = createNativeStackNavigator();
export const ResourceNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={Route.ResourceMain} component={ResourceMainScreen}></Stack.Screen>
            <Stack.Screen name={Route.UploadResource} component={UploadResourceScreen}></Stack.Screen>
            <Stack.Screen name={Route.ResourceDetail} component={ResourceDetailScreen}></Stack.Screen>
            <Stack.Screen name={Route.ResourceEdit} component={ResourceEditScreen}></Stack.Screen>
        </Stack.Navigator>
    );
};