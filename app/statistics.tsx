import {useBackHandler} from "@react-native-community/hooks";
import {useRouter} from "expo-router";
import React, {useCallback, useEffect, useMemo, useState} from "react"
import {ScrollView, XStack, YStack} from "tamagui";
import {ActivityIndicator} from "react-native";

import HeaderButton from "@/components/buttons/HeaderButton";
import CustomStackScreen from "@/components/CustomStackScreen";
import {CustomText} from "@/components/CustomText";
import Header from "@/components/Header";
import useApi from "@/hooks/useApi";
import i18n from "@/localization/i18n";
import statisticsApi from "@/api/endpoints/statisticsApi";
import {GradeByParticipant} from "@/types/statistics/GradeByParticipant";
import SegmentedControl from "@/components/SegmentedControl";
import StatisticsChart from "@/components/statistics/charts";
import {StatisticsType} from "@/types/statistics";
import {ParticipantDailyStats} from "@/types/statistics/DailyStatistics";


const StatisticsView = () => {
    const router = useRouter();

    const tabs = useMemo(() => ([
        i18n.t("avg_grade"),
        i18n.t("reading_statistics"),
    ]), [])

    const [avgData, setAvgData] = useState<GradeByParticipant[] | undefined>(undefined)
    const [dailyData, setDailyData] = useState<ParticipantDailyStats[] | undefined>(undefined)

    const [currentTab, setCurrentTab] = useState(0)
    const [chartType, setChartType] = useState<StatisticsType>("avgGrade")

    const changeTab = (newTab: number) => {
        if (newTab < 0 || newTab >= tabs.length) {
            return
        }
        setCurrentTab(newTab)
        if (newTab === 0) {
            setChartType("avgGrade")
        } else {
            setChartType("daily")
        }
    }

    const onCancel = useCallback(() => {
        router.back();
    }, [router]);

    useBackHandler(() => {
        onCancel();
        return true;
    });

    const getAvgGradeApi = useApi(
        statisticsApi.getAvgGrade,
        {
            onSuccess: (data) => {
                setAvgData(data)
            },
            errorHandler: {
                title: i18n.t("error_header"),
                message: i18n.t("error_load_statistics"),
                options: {
                    tryAgain: true,
                    navigate: {
                        mode: "back",
                    },
                },
            },
        },
    )

    const getDailyApi = useApi(
        statisticsApi.getDaily,
        {
            onSuccess: (data) => {
                setDailyData(data)
            },
            errorHandler: {
                title: i18n.t("error_header"),
                message: i18n.t("error_load_statistics"),
                options: {
                    tryAgain: true,
                    navigate: {
                        mode: "back",
                    },
                },
            },
        },
    )

    useEffect(() => {
        if (currentTab === 0) {
            getAvgGradeApi.execute()
        } else {
            getDailyApi.execute()
        }
    }, [currentTab]);

    return (
        <>
            <CustomStackScreen/>
            <YStack flex={1} justifyContent="space-between" height="100%">
                <Header backgroundColor="transparent">
                    <XStack justifyContent="space-between" width="100%">
                        <HeaderButton
                            onPress={onCancel}
                            backgroundColor="transparent"
                            color="$gray-20"
                            text={i18n.t("back")}
                        />
                    </XStack>
                </Header>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <YStack
                        flex={1}
                        gap={16}
                        marginHorizontal={16}
                        justifyContent="space-between"
                        marginBottom={20}
                        paddingTop={28}
                        overflow="hidden"
                    >
                        <CustomText size="h1" color="$gray-20">
                            {i18n.t("statistics")}
                        </CustomText>
                        <SegmentedControl
                            variant="white"
                            options={tabs}
                            currentTab={currentTab}
                            onChange={changeTab}
                        />
                        <YStack
                            borderRadius={20}
                            paddingVertical={20}
                            backgroundColor="$gray-100"
                            height="100%"
                            flex={1}
                        >
                            {getAvgGradeApi.loading || !avgData ? (
                                <ActivityIndicator size="large" color="blue"/>
                            ) : (
                                <StatisticsChart avgData={avgData} dailyData={dailyData} type={chartType}/>
                            )}
                        </YStack>
                    </YStack>
                </ScrollView>
            </YStack>
        </>
    )
}

export default StatisticsView;
