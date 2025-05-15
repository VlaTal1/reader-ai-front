import React, {useEffect, useMemo, useRef, useState} from "react";
import {BarChart} from "react-native-gifted-charts";
import {Animated, Dimensions, FlatList, StyleSheet} from "react-native";
import {View, XStack} from "tamagui";

import {GradeByParticipant} from "@/types/statistics/GradeByParticipant";
import {CustomText} from "@/components/CustomText";
import i18n from "@/localization/i18n";

type Props = {
    data: GradeByParticipant[];
    height?: number;
    width?: number;
    maxGrade?: number;
    gradientColors?: string[];
    showCompletionRate?: boolean;
};

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const CARD_SPACING = 30;

const AvgGradeChart: React.FC<Props> = ({
                                            data,
                                            height = 300,
                                            width = 300,
                                            maxGrade = 10,
                                            gradientColors = ["#FF6B6B", "#FFD166", "#06D6A0"],
                                            showCompletionRate = true,
                                        }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const chartData = useMemo(() => {
        return data.map((item, index) => {
            const colorIndex = Math.min(
                Math.floor((item.avgGrade / maxGrade) * gradientColors.length),
                gradientColors.length - 1,
            );
            const baseColor = gradientColors[colorIndex];

            const color = index === selectedIndex
                ? baseColor
                : `${baseColor}80`;

            const completionRate = item.totalTests > 0
                ? (item.completedTests / item.totalTests) * 100
                : 0;

            return {
                stacks: [
                    {
                        value: item.avgGrade,
                        color: color,
                        marginBottom: 0,
                        onPress: () => handleBarPress(index),
                    },
                ],
                label: item.participant.name.split(" ")[0],
                frontLabel: showCompletionRate ? `${completionRate.toFixed(0)}%` : undefined,
            };
        });
    }, [data, maxGrade, gradientColors, showCompletionRate, selectedIndex]);

    const yAxisMaxValue = useMemo(() => {
        const maxDataValue = Math.max(...data.map(item => item.avgGrade), 0);
        return Math.max(maxDataValue, maxGrade);
    }, [data, maxGrade]);

    const handleBarPress = (index: number) => {
        setSelectedIndex(index);
        flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
        });
    };

    useEffect(() => {
        const listener = scrollX.addListener(({value}) => {
            const index = Math.round(value / (CARD_WIDTH + CARD_SPACING));
            if (index !== selectedIndex && index >= 0 && index < data.length) {
                setSelectedIndex(index);
            }
        });

        return () => {
            scrollX.removeListener(listener);
        };
    }, [selectedIndex, data.length]);

    const renderParticipantCard = ({item, index}: { item: GradeByParticipant; index: number }) => {
        const colorIndex = Math.min(
            Math.floor((item.avgGrade / maxGrade) * gradientColors.length),
            gradientColors.length - 1,
        );
        const gradeColor = gradientColors[colorIndex];

        const completionRate = item.totalTests > 0
            ? (item.completedTests / item.totalTests) * 100
            : 0;

        const inputRange = [
            (index - 1) * (CARD_WIDTH + CARD_SPACING),
            index * (CARD_WIDTH + CARD_SPACING),
            (index + 1) * (CARD_WIDTH + CARD_SPACING),
        ];

        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
        });

        return (
            <Animated.View
                style={[
                    styles.card,
                    {
                        width: CARD_WIDTH,
                        marginHorizontal: CARD_SPACING / 2,
                        transform: [{scale}],
                        gap: 10,
                    },
                    index === selectedIndex && styles.selectedCard,
                ]}
            >
                <CustomText size="h4Medium" color="$gray-0">
                    {item.participant.name}
                </CustomText>
                <View gap={2}>
                    <XStack justifyContent="space-between">
                        <CustomText size="p1Regular" color="$gray-0">
                            {i18n.t("tests")}
                        </CustomText>
                        <CustomText size="p1Regular" color="$gray-0">
                            {item.completedTests} / {item.totalTests}
                        </CustomText>
                    </XStack>
                    <XStack justifyContent="space-between">
                        <CustomText size="p1Regular" color="$gray-0">
                            {i18n.t("completed")}
                        </CustomText>
                        <CustomText size="p1Regular" color="$gray-0">
                            {completionRate.toFixed(0)}%
                        </CustomText>
                    </XStack>
                    <XStack justifyContent="space-between">
                        <CustomText size="p1Regular" color="$gray-0">
                            {i18n.t("avg_grade")}
                        </CustomText>
                        <CustomText size="p1Regular" color={gradeColor}>
                            {item.avgGrade.toFixed(1)}
                        </CustomText>
                    </XStack>
                </View>
            </Animated.View>
        );
    };

    const handleScroll = Animated.event(
        [{nativeEvent: {contentOffset: {x: scrollX}}}],
        {useNativeDriver: false},
    );

    const handleMomentumScrollEnd = (event: { nativeEvent: { contentOffset: { x: number; }; }; }) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING));
        if (index !== selectedIndex && index >= 0 && index < data.length) {
            setSelectedIndex(index);
        }
    };

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
                    barWidth={30}
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

            <FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={(item) => item.participant.id.toString()}
                renderItem={renderParticipantCard}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardListContainer}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                snapToAlignment="center"
                decelerationRate="fast"
                onScroll={handleScroll}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                initialScrollIndex={selectedIndex}
                getItemLayout={(_, index) => ({
                    length: CARD_WIDTH + CARD_SPACING,
                    offset: (CARD_WIDTH + CARD_SPACING) * index,
                    index,
                })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: "#333",
    },
    chartContainer: {
        alignItems: "center",
        marginBottom: 20,
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
    hint: {
        fontSize: 12,
        fontStyle: "italic",
        color: "#666",
        textAlign: "center",
        marginBottom: 15,
    },
    cardListContainer: {
        paddingVertical: 10,
        paddingHorizontal: SCREEN_WIDTH * 0.1 - CARD_SPACING / 2,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedCard: {
        backgroundColor: "#f5f9fc",
    },
    cardName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
    },
    cardDetails: {
        gap: 8,
    },
    detailItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    detailLabel: {
        fontSize: 14,
        color: "#666",
    },
    detailValue: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    gradeValue: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default React.memo(AvgGradeChart);