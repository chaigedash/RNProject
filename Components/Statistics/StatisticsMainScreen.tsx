import {View, StyleSheet, Text} from "react-native";
import { LineChart } from 'react-native-chart-kit';
import {Color, globalStyles} from "../../Constant/Theme.ts";

export const StatisticsMainScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={[globalStyles.titleText, styles.title]}>
                统计分析
            </Text>
            <View style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 20,
            }}>
                <LineChart
                    data={{
                        labels: ['miao', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [
                            {
                                data: [20, 45, 28, 80, 99, 43],
                                color: () => Color.primary, // 自定义颜色
                                strokeWidth: 2, // 线条宽度
                            },
                        ],
                    }}
                    width={300} // 宽度
                    height={200} // 高度
                    chartConfig={{
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        decimalPlaces: 2, // 小数位数
                        color: () => Color.basic,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                ></LineChart>
                <View style={{
                    backgroundColor: Color.primary,
                    borderRadius: 20,
                    height: 50,
                }}>
                    <Text style={{
                        height: '100%',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        color: Color.light,
                        fontSize: 18,
                        fontWeight: 500
                    }}>
                        今日成绩: 97/100
                    </Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        marginBottom: 20,
    }
})