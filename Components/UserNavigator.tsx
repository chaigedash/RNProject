import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Route} from "../Constant/Enums.ts";
import {UserMainScreen} from "./User/UserMainScreen.tsx";
import {CollectionScreen} from "./User/CollectionScreen.tsx";
import {UserInfoScreen} from "./User/UserInfoScreen.tsx";
import {UserNameScreen} from "./User/UserInfo/UserNameScreen.tsx";
import {UserSchoolScreen} from "./User/UserInfo/UserSchoolScreen.tsx";
import {UserMajorScreen} from "./User/UserInfo/UserMajorScreen.tsx";
import {PermissionAssignmentScreen} from "./User/PermissionAssignmentScreen.tsx";

const Stack = createNativeStackNavigator();
export const UserNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={Route.UserMain} component={UserMainScreen}></Stack.Screen>
            <Stack.Screen name={Route.Collection} component={CollectionScreen}></Stack.Screen>
            <Stack.Screen name={Route.UserInfo} component={UserInfoScreen}></Stack.Screen>
            <Stack.Screen name={Route.UserName} component={UserNameScreen}></Stack.Screen>
            <Stack.Screen name={Route.UserSchool} component={UserSchoolScreen}></Stack.Screen>
            <Stack.Screen name={Route.UserMajor} component={UserMajorScreen}></Stack.Screen>
            <Stack.Screen name={Route.PermissionAssignment} component={PermissionAssignmentScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}