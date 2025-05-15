import React, {useMemo} from "react";
import {BarChart} from "react-native-gifted-charts";
import {StyleSheet, View} from "react-native";

import {GradeByParticipant} from "@/types/statistics/GradeByParticipant";

type Props = {
    data: GradeByParticipant[];
    height?: number;
    width?: number;
    maxGrade?: number;
    gradientColors?: string[];
    showCompletionRate?: boolean;
};

const AvgGradeChart: React.FC<Props> = ({
                                            data,
                                            height = 300,
                                            width = 300,
                                            maxGrade = 10,
                                            gradientColors = ["#FF6B6B", "#FFD166", "#06D6A0"],
                                            showCompletionRate = true,
                                        }) => {
    const chartData = useMemo(() => {
        return data.map((item) => {
            const colorIndex = Math.min(
                Math.floor((item.avgGrade / maxGrade) * gradientColors.length),
                gradientColors.length - 1,
            );
            const color = gradientColors[colorIndex];

            const completionRate = item.totalTests > 0
                ? (item.completedTests / item.totalTests) * 100
                : 0;

            return {
                stacks: [
                    {
                        value: item.avgGrade,
                        color: color,
                        marginBottom: 0,
                    },
                ],
                label: item.participant.name.split(" ")[0],
                frontLabel: showCompletionRate ? `${completionRate.toFixed(0)}%` : undefined,
            };
        });
    }, [data, maxGrade, gradientColors, showCompletionRate]);

    const yAxisMaxValue = useMemo(() => {
        const maxDataValue = Math.max(...data.map(item => item.avgGrade), 0);
        return Math.max(maxDataValue, maxGrade);
    }, [data, maxGrade]);

    const numberOfSections = 5;

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <BarChart
                    stackData={chartData}
                    width={width}
                    height={height}
                    spacing={22}
                    barBorderRadius={4}
                    xAxisThickness={1}
                    xAxisColor="#BFBFBF"
                    xAxisType="dashed"
                    xAxisLabelTextStyle={styles.axisLabel}
                    xAxisLabelsAtBottom={true}
                    hideYAxisText={false}
                    yAxisTextStyle={styles.axisLabel}
                    yAxisExtraHeight={20}
                    yAxisThickness={0}
                    yAxisLabelWidth={40}
                    maxValue={yAxisMaxValue}
                    noOfSections={numberOfSections}
                    rulesColor="#BFBFBF"
                    rulesType="dashed"
                    showVerticalLines={false}
                    dashWidth={5}
                    dashGap={5}
                    hideRules={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    chartContainer: {
        alignItems: "center",
    },
    axisLabel: {
        color: "#999999",
        fontSize: 12,
        fontFamily: "System",
    },
    frontLabelContainer: {
        marginTop: -26,
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 4,
    },
    frontLabelText: {
        color: "#333333",
        fontSize: 10,
        fontFamily: "System",
    },
    legendText: {
        fontSize: 11,
        color: "#666666",
        fontStyle: "italic",
        marginTop: 5,
    },
});

export default React.memo(AvgGradeChart);