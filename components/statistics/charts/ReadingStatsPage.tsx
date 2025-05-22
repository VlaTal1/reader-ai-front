import React, {useMemo, useState} from "react";
import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LineChart} from "react-native-gifted-charts";

import {ParticipantDailyStats} from "@/types/statistics/DailyStatistics";
import i18n from "@/localization/i18n";

type Props = {
    data: ParticipantDailyStats[];
};

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const CHART_WIDTH = SCREEN_WIDTH - 150;

const ReadingStatsPage: React.FC<Props> = ({data}) => {
    const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(
        data.length > 0 ? data[0].participant.id : null,
    );

    const formatDateForDisplay = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
    };

    const {readingTimeData, pagesReadData} = useMemo(() => {
        if (!selectedParticipantId) {
            return {readingTimeData: [], pagesReadData: []};
        }

        const selectedParticipant = data.find(
            (item) => item.participant.id === selectedParticipantId,
        );

        if (!selectedParticipant) {
            return {readingTimeData: [], pagesReadData: []};
        }

        const sortedDates = Object.keys(selectedParticipant.dailyStats).sort();

        const readingTimeData = sortedDates.map((date) => ({
            value: selectedParticipant.dailyStats[date].totalReadingTimeMinutes,
            label: formatDateForDisplay(date),
            dataPointText: selectedParticipant.dailyStats[date].totalReadingTimeMinutes.toString(),
        }));

        const pagesReadData = sortedDates.map((date) => ({
            value: selectedParticipant.dailyStats[date].totalPagesRead,
            label: formatDateForDisplay(date),
            dataPointText: selectedParticipant.dailyStats[date].totalPagesRead.toString(),
        }));

        return {readingTimeData, pagesReadData};
    }, [data, selectedParticipantId]);

    const chartConfig = {
        width: CHART_WIDTH,
        height: 200,
        spacing: CHART_WIDTH / 6,
        endSpacing: 20,
        showDataPointsForAllPoints: true,
        dataPointsColor: "#00BFA6",
        dataPointsRadius: 5,
        thickness: 3,
        hideRules: false,
        rulesColor: "#E7E7E7",
        rulesType: "solid",
        xAxisColor: "#E7E7E7",
        yAxisColor: "#E7E7E7",
        showVerticalLines: true,
        verticalLinesColor: "#E7E7E7",
        verticalLinesType: "dashed",
        dashWidth: 5,
        dashGap: 5,
        noOfSections: 5,
        showYAxisIndices: true,
        showXAxisIndices: true,
        hideYAxisText: false,
        hideXAxisText: false,
        pointerConfig: {
            radius: 6,
            pointerColor: "#00BFA6",
            pointerLabelWidth: 100,
            pointerLabelHeight: 30,
        },
    };

    const renderParticipantSelector = () => (
        <View style={styles.selectorContainer}>
            <Text style={styles.selectorTitle}>{i18n.t("select_child")}</Text>
            <View style={styles.participantButtons}>
                {data.map((item) => (
                    <TouchableOpacity
                        key={item.participant.id}
                        style={[
                            styles.participantButton,
                            selectedParticipantId === item.participant.id &&
                            styles.selectedParticipantButton,
                        ]}
                        onPress={() => setSelectedParticipantId(item.participant.id)}
                    >
                        <Text
                            style={[
                                styles.participantButtonText,
                                selectedParticipantId === item.participant.id &&
                                styles.selectedParticipantButtonText,
                            ]}
                        >
                            {item.participant.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderChart = (
        title: string,
        data: { value: number; label: string; dataPointText: string }[],
        color: string,
    ) => {
        if (data.length === 0) {
            return <Text style={styles.noDataText}>No data</Text>;
        }

        const maxValue = Math.max(...data.map((item) => item.value));
        const maxYValue = maxValue + Math.ceil(maxValue * 0.2);
        const stepSize = Math.ceil(maxYValue / 5);
        const yAxisValues = [...Array(6)].map((_, i) => stepSize * i);

        return (
            <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>{title}</Text>
                <LineChart
                    data={data}
                    {...chartConfig}
                    maxValue={maxYValue}
                    yAxisTextStyle={styles.axisText}
                    yAxisLabelTexts={yAxisValues.map((v) => v.toString())}
                    xAxisLabelTextStyle={styles.axisText}
                    color={color}
                    hideDataPoints={false}
                    curved={true}
                    disableScroll={false}
                    isAnimated={true}
                    textFontSize={14}
                    textShiftY={-10}
                    textShiftX={-5}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {renderParticipantSelector()}
            <View style={styles.chartsContainer}>
                {renderChart(i18n.t("reading_time"), readingTimeData, "#00BFA6")}
                {renderChart(i18n.t("pages"), pagesReadData, "#5E81F4")}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#F9F9F9",
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
        textAlign: "center",
    },
    selectorContainer: {
        marginBottom: 20,
    },
    selectorTitle: {
        fontSize: 16,
        marginBottom: 10,
        color: "#333",
    },
    participantButtons: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    participantButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#F0F0F0",
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    selectedParticipantButton: {
        backgroundColor: "#5E81F4",
        borderColor: "#5E81F4",
    },
    participantButtonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    selectedParticipantButtonText: {
        color: "#FFFFFF",
    },
    chartsContainer: {
        flex: 1,
        gap: 20,
    },
    chartContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 15,
        color: "#333",
    },
    chartScrollContent: {
        paddingVertical: 10,
    },
    axisText: {
        fontSize: 12,
        color: "#333333",
        fontWeight: "500",
    },
    noDataText: {
        fontSize: 14,
        color: "#888888",
        textAlign: "center",
        marginVertical: 20,
    },
    pointerLabelContainer: {
        backgroundColor: "#fff",
        padding: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    pointerLabelText: {
        fontSize: 16,
        fontWeight: "500",
    },
});

export default ReadingStatsPage;
