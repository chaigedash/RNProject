import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Color, globalStyles} from "../../Constant/Theme.ts";
import {ResourceType} from "../../Constant/Enums.ts";
import {BigButton} from "../common/BigButton.tsx";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export const UploadResourceScreen = () => {
    const handleUpload = (type: ResourceType) => {
    //     TODO：得等到买了云对象存储之后，优先级最低
    }
    return (
        <View style={styles.mainContainer}>
            <Text style={[globalStyles.titleText, styles.title]}>请选择上传资源的类型</Text>
            <BigButton
                title={'文件'}
                leftIcon={<FontAwesome5Icon name={'file-alt'} size={30}/> }
                intro={'支持txt、md等后缀'}
                handlePress={() => handleUpload(ResourceType.text)}
            ></BigButton>
            <BigButton
                title={'视频'}
                leftIcon={<FontAwesome5Icon name={'file-alt'} size={30}/> }
                intro={'支持mp4、mov等后缀'}
                handlePress={() => handleUpload(ResourceType.video)}
            ></BigButton>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        position: "absolute",
        top: 20,
        left: 20,
    },
})