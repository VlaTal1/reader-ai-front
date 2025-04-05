import React, {useCallback, useEffect, useState} from "react";
import {XStack, YStack} from "tamagui";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useBackHandler} from "@react-native-community/hooks";
import Pdf from "react-native-pdf";
import {ActivityIndicator, Dimensions, View} from "react-native";
import * as FileSystem from "expo-file-system";

import CustomStackScreen from "@/components/CustomStackScreen";
import i18n from "@/localization/i18n";
import Header from "@/components/Header";
import HeaderButton from "@/components/buttons/HeaderButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import {CustomText} from "@/components/CustomText";
import BackIcon from "@/assets/images/icons/back-icon.svg";
import NextIcon from "@/assets/images/icons/next-icon.svg";
import {getAccessToken} from "@/auth/supabase";
import {getApiBaseUrl} from "@/api";
import BottomButtonGroup from "@/components/buttons/BottomButtonGroup";

interface PdfState {
    uri: string | null;
    totalPages: number;
    currentPage: number;
    isLoading: boolean;
}

const Reader = () => {
    const {id} = useLocalSearchParams();

    const router = useRouter();
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    const [pdfState, setPdfState] = useState<PdfState>({
        uri: null,
        totalPages: 0,
        currentPage: 1,
        isLoading: true,
    });

    const onCancel = useCallback(() => {
        router.back();
    }, [router]);

    useBackHandler(() => {
        onCancel();
        return true;
    });

    const downloadBook = async (bookId: string) => {
        try {
            setPdfState(prev => ({...prev, isLoading: true}));
            const accessToken = await getAccessToken();
            const apiBaseUrl = getApiBaseUrl()

            const fileUri = `${FileSystem.cacheDirectory}book_${bookId}.pdf`;

            const downloadResult = await FileSystem.downloadAsync(
                `${apiBaseUrl}/api/books/${bookId}/download`,
                fileUri,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                },
            );

            if (downloadResult.status === 200) {
                setPdfState(prev => ({
                    ...prev,
                    uri: downloadResult.uri,
                    isLoading: false,
                }));
            } else {
                setPdfState(prev => ({...prev, isLoading: false}));
                alert(i18n.t("failed_to_fetch_books"));
            }
        } catch (error) {
            setPdfState(prev => ({...prev, isLoading: false}));
            alert(`${i18n.t("error")}: ${i18n.t("failed_to_fetch_books")}`);
        }
    };

    useEffect(() => {
        if (id) {
            downloadBook(id.toString());
        } else {
            setPdfState(prev => ({...prev, isLoading: false}));
        }
    }, [id]);

    const handlePageChanged = (page: number, totalPages: number) => {
        setPdfState(prev => ({
            ...prev,
            currentPage: page,
            totalPages: totalPages,
        }));
    };

    const goToPreviousPage = () => {
        if (pdfState.currentPage > 1) {
            const newPage = pdfState.currentPage - 1;

            setPdfState(prev => ({
                ...prev,
                currentPage: newPage,
            }));
        }
    };

    const goToNextPage = () => {
        if (pdfState.currentPage < pdfState.totalPages) {
            const newPage = pdfState.currentPage + 1;

            setPdfState(prev => ({
                ...prev,
                currentPage: newPage,
            }));
        }
    };

    const pdfRef = React.useRef<Pdf>(null);

    return (
        <>
            <CustomStackScreen/>
            <YStack flex={1}>
                <XStack position="absolute" zIndex={9999} top={0} left={0}>
                    <Header backgroundColor="black">
                        <XStack justifyContent="space-between" width="100%">
                            <HeaderButton
                                onPress={onCancel}
                                backgroundColor="transparent"
                                color="$gray-100"
                                text={i18n.t("back")}
                            />
                        </XStack>
                    </Header>
                </XStack>

                <YStack flex={1}>
                    {pdfState.isLoading && (
                        <YStack flex={1} justifyContent="center" alignItems="center">
                            <ActivityIndicator size="large" color="blue"/>
                        </YStack>
                    )}

                    {!pdfState.isLoading && pdfState.uri && (
                        <YStack flex={1} width="100%">
                            <XStack justifyContent="center" marginBottom={8}/>

                            <View style={{flex: 1, width: "100%"}}>
                                <Pdf
                                    ref={pdfRef}
                                    source={{uri: pdfState.uri, cache: true}}
                                    style={{
                                        flex: 1,
                                        width: screenWidth,
                                        height: screenHeight,
                                        backgroundColor: "black",
                                    }}
                                    onLoadComplete={(numberOfPages) => {
                                        setPdfState(prev => ({
                                            ...prev,
                                            totalPages: numberOfPages,
                                        }));
                                    }}
                                    page={pdfState.currentPage}
                                    onPageChanged={(page, totalPages) => handlePageChanged(page, totalPages)}
                                    trustAllCerts={false}
                                    enablePaging={true}
                                    horizontal={true}
                                    enableRTL={false}
                                    fitPolicy={0}
                                />
                            </View>

                            <BottomButtonGroup
                                gradientColors={["transparent", "rgba(0,0,0,1)"]}
                            >
                                <XStack justifyContent="space-between" marginTop={16} alignItems="center">
                                    <PrimaryButton
                                        onPress={goToPreviousPage}
                                        disabled={pdfState.currentPage <= 1}
                                        icon={BackIcon}
                                        iconFillType="fill"
                                        width="30%"
                                    />
                                    <CustomText size="h4Regular" color="$gray-100">
                                        {pdfState.currentPage}/{pdfState.totalPages || "?"}
                                    </CustomText>
                                    <PrimaryButton
                                        onPress={goToNextPage}
                                        disabled={pdfState.currentPage >= pdfState.totalPages}
                                        icon={NextIcon}
                                        iconFillType="fill"
                                        width="30%"
                                    />
                                </XStack>
                            </BottomButtonGroup>
                        </YStack>
                    )}
                </YStack>
            </YStack>
        </>
    );
};

export default Reader;