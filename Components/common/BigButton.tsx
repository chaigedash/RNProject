import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {Color} from "../../Constant/Theme.ts";

export const BigButton = (
    props: {
        leftIcon?: any,
        rightIcon?: any,
        title: string,
        intro: string,
        handlePress: () => any
    }) => {
    return (
        <TouchableOpacity style={styles.buttonWrapper} onPress={props.handlePress}>
            <View style={styles.button}>
                <View style={styles.buttonLeft}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.buttonTitle}>
                            {props.leftIcon}
                            {props.leftIcon && <View style={{width: 10}}></View>}
                            {props.title}
                        </Text>
                    </View>
                    {
                        props.intro &&
                        <Text style={styles.buttonText}>{props.intro}</Text>
                    }
                </View>
                <View style={styles.buttonRight}>
                    {props.rightIcon ?
                        props.rightIcon :
                        <FontAwesome5Icon style={styles.buttonIcon} name={'caret-right'}></FontAwesome5Icon>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles =  StyleSheet.create({
    buttonWrapper: {
        marginVertical: 20,
        marginHorizontal: 50,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.primary,
        height: 100,
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    buttonLeft: {
        justifyContent: 'center',
    },
    buttonRight: {
        justifyContent: 'center',
    },
    buttonTitle: {
        fontSize: 30,
        color: Color.light
    },
    buttonText: {
        fontSize: 18,
        color: Color.light
    },
    buttonIcon: {
        fontSize: 50,
        color: Color.light,
    },
})