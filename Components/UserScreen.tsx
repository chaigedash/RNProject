import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SettingScreen} from "./User/SettingScreen.tsx";
import {UserMainScreen} from "./User/UserMainScreen.tsx";
import {CollectionScreen} from "./User/CollectionScreen.tsx";
import {UserInfoScreen} from "./User/UserInfoScreen.tsx";

const Stack = createNativeStackNavigator();
export const UserNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='UserMain' component={UserMainScreen}></Stack.Screen>
            <Stack.Screen name='Settings' component={SettingScreen}></Stack.Screen>
            <Stack.Screen name='Collection' component={CollectionScreen}></Stack.Screen>
            <Stack.Screen name='UserInfo' component={UserInfoScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}