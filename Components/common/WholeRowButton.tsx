import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Color, globalStyles} from "../../Constant/Theme.ts";

export const WholeRowButton = (props: {iconName?: string, text: string, detail?: string, handler: () => any}) => {
    return (
        <TouchableOpacity onPress={props.handler}>
            <View style={styles.buttonWrapper}>
                {
                    props.iconName
                    &&
                    <FontAwesome style={styles.leftIcon} name={props.iconName}></FontAwesome>
                }
                <Text style={[styles.text, styles.titleText]}>
                    {props.text}
                </Text>
                {
                    props.detail &&
                    <Text style={[styles.text, styles.detailText, globalStyles.secondaryText]}>
                        {props.detail}
                    </Text>
                }
                <FontAwesome style={styles.rightIcon} name="chevron-right"></FontAwesome>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonWrapper: {
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: Color.background,
    },
    leftIcon: {
        width: 35,
        textAlign: 'center',
        fontSize: 30,
        color: Color.primary,
    },
    text: {
        height: '100%',
        textAlignVertical: 'center',
    },
    titleText: {
        fontSize: 20,
        marginLeft: 5,
        color: Color.basic,
    },
    detailText: {
        position: 'absolute',
        right: 40,
    },
    rightIcon: {
        position: 'absolute',
        right: 20,
        color: Color.secondary,
    },
})