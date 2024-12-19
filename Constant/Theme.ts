import {StyleSheet} from "react-native";

export const Color = {
    primary: '#3869f4',
    basic: '#2a313d',
    secondary: '#647085',
    grey: '#f2f2f2',
    light: '#fcf5e2',
    background: 'white',
}
export const Size = {
    icon: 20
}
export const globalStyles = StyleSheet.create({
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Color.basic,
    },
    secondaryText: {
        fontSize: 15,
        color: Color.secondary,
    },
    centerText: {
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    tag: {
        borderColor: Color.secondary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
        paddingTop: 0,
        fontSize: 15,
        color: Color.secondary,
        marginRight: 5,
    },
})