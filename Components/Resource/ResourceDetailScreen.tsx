import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";

export const ResourceDetailScreen: React.FC<{route:any}> = ({route}) => {
    const [resourceId, setResourceId] = useState("");
    useEffect(() => {
        if (route.params.resourceId) {
            setResourceId(route.params.resourceId);
        //     TODO：数据结构设计和前端展示
        //     TODO：向后端发起数据请求
        }
    }, [route.params]);
    return (
        <View>
            <Text>
                {resourceId}
            </Text>
        </View>
    );
};