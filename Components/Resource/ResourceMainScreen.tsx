import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from "@rneui/base";
import {ResourceType, Route} from "../../Constant/Enums.ts";
import {useNavigation} from "@react-navigation/native";
import {Color, globalStyles} from "../../Constant/Theme.ts";
import {useEffect, useState} from "react";
import {resourceBasicInfoType} from "../../Constant/Type.ts";

export const ResourceList = () => {
    const navigation = useNavigation()
    const [resourceData, setResourceData] = useState<resourceBasicInfoType[]>([]);
    useEffect(() => {
        // TODO：缺后端
        setResourceData([
            {
                id: '1',
                title: "aaa",
                intro: 'aaaaaaa',
                type: ResourceType.text,
            },{
                id: '2',
                title: "bbb",
                intro: 'bbbbbbb',
                type: ResourceType.video,
            },{
                id: '3',
                title: "ccc",
                intro: 'ccccccc',
                type: ResourceType.text,
            },
        ])
    }, [navigation.isFocused()]);
    const handlePress = (resourceId: string) => {
        navigation.navigate(Route.ResourceDetail, {resourceId: resourceId});
    }
    return (
        <View>
            {
                resourceData.map(el => {
                    return (
                        <TouchableOpacity
                            key={el.id}
                            onPress={() => handlePress(el.id)}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                height: 60,
                                alignItems: 'center',
                                paddingHorizontal: 20,
                            }}>
                                <View>
                                    <Text style={globalStyles.titleText}>
                                        {el.title}
                                    </Text>
                                    <Text style={[globalStyles.secondaryText]}>
                                        {el.intro}
                                    </Text>
                                </View>
                                <Text style={globalStyles.tag}>
                                    {el.type}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    );
};
export const ResourceMainScreen = () => {
    const navigation = useNavigation();
    const handlePress = (toScreen: Route, params?: any) => {
        // toScreen : Components/UserScreen.tsx -> Stack.Screen.name
        navigation.navigate(toScreen, params);
    }
    return (
        <View style={styles.mainContainer}>
            <Button
                color={Color.primary}
                containerStyle={{
                    marginVertical: 10,
                }}
                title={'上传资源'}
                onPress={() => handlePress(Route.UploadResource)}
            ></Button>
            <ResourceList></ResourceList>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
})