import React, {useState} from "react";
import {ActivityIndicator, Alert} from "react-native";
import { View, XStack, YStack} from "tamagui";

import i18n from "@/localization/i18n";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CustomStackScreen from "@/components/CustomStackScreen";
import {CustomText} from "@/components/CustomText";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import {useAuth} from "@/auth/SupabaseAuthProvider";
import Input from "@/components/input";
import GoogleIcon from "@/assets/images/icons/google-icon.svg";
import {isBlank, isValidEmail, isValidPassword} from "@/functions";

// Define the different steps/screens in the password reset flow
enum PasswordResetStep {
    NONE, // Normal login screen
    REQUEST_RESET, // Enter email screen
    VERIFY_CODE, // Enter verification code screen
    NEW_PASSWORD, // Enter new password screen
}

const GoogleSignInButton = ({onPress, isLoading}: {
    onPress: () => void;
    isLoading: boolean;
}) => {
    return (
        <XStack
            backgroundColor="transparent"
            height="auto"
            borderRadius={12}
            padding={12}
            borderColor="$gray-75"
            pressStyle={{
                borderColor: "$gray-20",
                backgroundColor: "transparent",
            }}
            disabledStyle={{borderColor: "$gray-75"}}
            borderWidth={1}
            paddingVertical={12}
            paddingHorizontal={16}
            justifyContent="center"
            alignItems="center"
            gap={8}
            onPress={onPress}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color="#4285F4"/>
            ) : (
                <GoogleIcon width={24} height={24}/>
            )}
            <CustomText size="p1Regular" color="$gray-20">
                {i18n.t("login_with_google")}
            </CustomText>
        </XStack>
    );
};

const Login = () => {
    const {
        signIn,
        signUp,
        // signInWithGoogle,
        resetPassword,
        verifyPasswordResetCode,
        updatePassword,
        isLoading,
    } = useAuth();
    // General login state
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localLoading, setLocalLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    // Password reset state
    const [resetStep, setResetStep] = useState<PasswordResetStep>(PasswordResetStep.NONE);
    const [resetEmail, setResetEmail] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onLogin = async () => {
        if (showLoginForm) {
            if (!email || !password) {
                Alert.alert("Error", "Please enter email and password");
                return;
            }

            setLocalLoading(true);
            try {
                const {error} = await signIn(email, password);
                if (error) {
                    Alert.alert("Login error");
                }
            } catch (e) {
                console.error(e);
                Alert.alert("Error", "Could not log in");
            } finally {
                setLocalLoading(false);
            }
        } else {
            setShowLoginForm(true);
        }
    };

    const onSignUp = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter email and password");
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert("Error", "Please enter a valid email address, e.g. johndoe@example.com");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long");
            return;
        }

        setLocalLoading(true);
        try {
            const {error, user} = await signUp(email, password);

            if (error) {
                Alert.alert("Sign up error");
            } else if (user) {
                Alert.alert("Success!", "Account is created!");
            }
        } catch (e) {
            console.error(e);
            Alert.alert("Error", "Could not sign up");
        } finally {
            setLocalLoading(false);
        }
    };

    const onGoogleLogin = async () => {
        // setGoogleLoading(true);
        // try {
        //     const {error} = await signInWithGoogle();
        //     if (error) {
        //         Alert.alert("Google login error");
        //     }
        // } catch (e) {
        //     console.error(e);
        //     Alert.alert("Error", "Could not log in with Google");
        // } finally {
        //     setGoogleLoading(false);
        // }
        Alert.alert("Not implemented yet")
    };

    // Start forgot password flow
    const onForgotPassword = () => {
        setResetStep(PasswordResetStep.REQUEST_RESET);
        setResetEmail(email); // Pre-fill with the email from login form if available
    };

    // Send password reset email with code
    const onRequestPasswordReset = async () => {
        if (!resetEmail) {
            Alert.alert("Error", "Please enter your email address");
            return;
        }

        if (!isValidEmail(resetEmail)) {
            Alert.alert("Error", "Please enter a valid email address");
            return;
        }

        setLocalLoading(true);
        try {
            const {error} = await resetPassword(resetEmail);
            if (error) {
                Alert.alert("Password Reset Error");
            } else {
                Alert.alert(
                    "Password Reset Email Sent",
                    "Check your email for a 6-digit code to reset your password.",
                    [{text: "OK"}],
                );
                setResetStep(PasswordResetStep.VERIFY_CODE);
            }
        } catch (e) {
            console.error(e);
            Alert.alert("Error", "Could not send password reset email");
        } finally {
            setLocalLoading(false);
        }
    };

    // Verify the reset code
    const onVerifyResetCode = async () => {
        if (!resetCode || resetCode.length < 6) {
            Alert.alert("Error", "Please enter the 6-digit code from your email");
            return;
        }

        setLocalLoading(true);
        try {
            const {error, session} = await verifyPasswordResetCode(resetEmail, resetCode);
            if (error) {
                Alert.alert("Verification Error");
            } else if (session) {
                setResetStep(PasswordResetStep.NEW_PASSWORD);
            } else {
                Alert.alert("Error", "Verification failed. Please try again.");
            }
        } catch (e) {
            console.error(e);
            Alert.alert("Error", "Could not verify reset code");
        } finally {
            setLocalLoading(false);
        }
    };

    // Set new password
    const onSetNewPassword = async () => {
        if (!newPassword) {
            Alert.alert("Error", "Please enter a new password");
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setLocalLoading(true);
        try {
            const {error} = await updatePassword(newPassword);
            if (error) {
                Alert.alert("Password Update Error");
            } else {
                Alert.alert(
                    "Password Updated",
                    "Your password has been successfully updated. You can now log in with your new password.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                // Reset the state and return to login
                                setResetStep(PasswordResetStep.NONE);
                                setShowLoginForm(true);
                                setResetEmail("");
                                setResetCode("");
                                setNewPassword("");
                                setConfirmPassword("");
                                // Pre-fill the email field on the login screen
                                setEmail(resetEmail);
                                setPassword("");
                            },
                        },
                    ],
                );
            }
        } catch (e) {
            console.error(e);
            Alert.alert("Error", "Could not update password");
        } finally {
            setLocalLoading(false);
        }
    };

    // Cancel password reset flow
    const onCancelReset = () => {
        setResetStep(PasswordResetStep.NONE);
        setResetEmail("");
        setResetCode("");
        setNewPassword("");
        setConfirmPassword("");
    };

    if (isLoading || localLoading) {
        return (
            <YStack flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator size="large" color="#0000ff"/>
            </YStack>
        );
    }

    // Render the appropriate reset password screen based on the current step
    if (resetStep !== PasswordResetStep.NONE) {
        let title = "";
        let description = "";
        let content = null;

        switch (resetStep) {
            case PasswordResetStep.REQUEST_RESET:
                title = i18n.t("forgot_password") || "Forgot Password";
                description = i18n.t("forgot_password_instructions") ||
                    "Enter your email address and we'll send you a code to reset your password.";
                content = (
                    <YStack gap={8}>
                        <Input
                            id="forgot_password_email"
                            placeholder={i18n.t("login_email") || "Email"}
                            value={resetEmail}
                            setValue={setResetEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            errorMessage={(isBlank(resetEmail) || isValidEmail(resetEmail)) ? "" :
                                i18n.t("edit_email_validation") || "Please enter a valid email"}
                        />
                        <PrimaryButton
                            text={i18n.t("send_reset_code") || "Send Reset Code"}
                            onPress={onRequestPasswordReset}
                        />
                        <SecondaryButton
                            text={i18n.t("cancel") || "Cancel"}
                            onPress={onCancelReset}
                        />
                    </YStack>
                );
                break;

            case PasswordResetStep.VERIFY_CODE:
                title = i18n.t("verify_code") || "Verify Code";
                description = i18n.t("verify_code_instructions") ||
                    "Enter the 6-digit code we sent to your email address.";
                content = (
                    <YStack gap={8}>
                        <Input
                            id="reset_code"
                            placeholder={i18n.t("verification_code") || "6-digit code"}
                            value={resetCode}
                            setValue={setResetCode}
                            keyboardType="number-pad"
                            maxLength={6}
                        />
                        <PrimaryButton
                            text={i18n.t("verify_code") || "Verify Code"}
                            onPress={onVerifyResetCode}
                        />
                        <SecondaryButton
                            text={i18n.t("cancel") || "Cancel"}
                            onPress={onCancelReset}
                        />
                    </YStack>
                );
                break;

            case PasswordResetStep.NEW_PASSWORD:
                title = i18n.t("new_password") || "New Password";
                description = i18n.t("new_password_instructions") ||
                    "Create a new password for your account.";
                content = (
                    <YStack gap={8}>
                        <Input
                            id="new_password"
                            placeholder={i18n.t("new_password") || "New Password"}
                            value={newPassword}
                            setValue={setNewPassword}
                            secureTextEntry={true}
                            errorMessage={(isBlank(newPassword) || isValidPassword(newPassword)) ? "" :
                                i18n.t("validation_error_password") || "Password must be at least 6 characters"}
                        />
                        <Input
                            id="confirm_password"
                            placeholder={i18n.t("confirm_password") || "Confirm Password"}
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            secureTextEntry={true}
                            errorMessage={
                                (isBlank(confirmPassword) || newPassword === confirmPassword) ? "" :
                                    i18n.t("passwords_dont_match") || "Passwords don't match"
                            }
                        />
                        <PrimaryButton
                            text={i18n.t("update_password") || "Update Password"}
                            onPress={onSetNewPassword}
                        />
                        <SecondaryButton
                            text={i18n.t("cancel") || "Cancel"}
                            onPress={onCancelReset}
                        />
                    </YStack>
                );
                break;
        }

        return (
            <YStack
                flex={1}
                height="100%"
                justifyContent="space-between"
                alignItems="center"
                gap={16}
            >
                <CustomStackScreen/>
                <YStack alignItems="center" justifyContent="center" flexGrow={1}>
                    <View gap={16} alignItems="center">
                        <YStack gap={12} alignItems="center">
                            <View gap={8} alignItems="center">
                                <CustomText size="h1" color="$gray-20">
                                    {title}
                                </CustomText>
                            </View>
                            <CustomText size="p1Light" color="$gray-40" textAlign="center">
                                {description}
                            </CustomText>
                        </YStack>
                    </View>
                </YStack>

                <YStack
                    backgroundColor="white"
                    paddingHorizontal={16}
                    borderTopLeftRadius={20}
                    borderTopRightRadius={20}
                    width="100%"
                    paddingBottom={24}
                >
                    <XStack marginVertical={24} justifyContent="center">
                        <CustomText size="h4Regular" textAlign="center">
                            {title}
                        </CustomText>
                    </XStack>

                    <YStack gap={16}>
                        {content}
                    </YStack>
                </YStack>
            </YStack>
        );
    }

    // Regular login screen
    return (
        <YStack
            flex={1}
            height="100%"
            justifyContent="space-between"
            alignItems="center"
            gap={showLoginForm ? 16 : 0}
        >
            <CustomStackScreen/>
            <YStack alignItems="center" justifyContent="center" flexGrow={1}>
                <View gap={16} alignItems="center">
                    <YStack gap={12} alignItems="center">
                        <View gap={8} alignItems="center">
                            <CustomText size="p1Light" color="$gray-40">
                                {i18n.t("welcome_to")}
                            </CustomText>
                            <CustomText size="h1" color="$gray-20">
                                {i18n.t("app_name")}
                            </CustomText>
                        </View>
                        <CustomText size="p1Light" color="$gray-40">
                            {i18n.t("app_description")}
                        </CustomText>
                    </YStack>
                </View>
            </YStack>

            <YStack
                backgroundColor="white"
                paddingHorizontal={16}
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                width="100%"
                paddingBottom={24}
            >
                <XStack marginVertical={24} justifyContent="center">
                    <CustomText size="h4Regular" textAlign="center">
                        {showLoginForm ? i18n.t("enter_credentials") : i18n.t("please_login")}
                    </CustomText>
                </XStack>

                {showLoginForm ? (
                    <YStack gap={16}>
                        <YStack gap={8}>
                            <Input
                                id="login_email"
                                placeholder={i18n.t("login_email")}
                                value={email}
                                setValue={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                errorMessage={(isBlank(email) || isValidEmail(email)) ? "" : i18n.t("edit_email_validation")}
                            />
                            <Input
                                id="login_password"
                                placeholder={i18n.t("login_password")}
                                value={password}
                                setValue={setPassword}
                                secureTextEntry={true}
                                errorMessage={(isBlank(password) || isValidPassword(password)) ? "" : i18n.t("validation_error_password")}
                            />

                            <XStack justifyContent="flex-end" paddingVertical={4}>
                                <CustomText
                                    size="p2Regular"
                                    color="$primary"
                                    textDecorationLine="underline"
                                    onPress={onForgotPassword}
                                >
                                    {i18n.t("forgot_password") || "Forgot Password?"}
                                </CustomText>
                            </XStack>

                            <PrimaryButton text={i18n.t("login")} onPress={onLogin}/>
                            <SecondaryButton text={i18n.t("sign_up")} onPress={onSignUp}/>
                        </YStack>
                        <XStack alignItems="center" gap={12}>
                            <View flex={1} borderTopWidth={1} borderTopColor="$gray-75"/>
                            <CustomText size="p1Light" color="$gray-60">{i18n.t("or")}</CustomText>
                            <View flex={1} borderTopWidth={1} borderTopColor="$gray-75"/>
                        </XStack>
                        <GoogleSignInButton onPress={onGoogleLogin} isLoading={googleLoading}/>
                    </YStack>
                ) : (
                    <YStack gap={16}>
                        <PrimaryButton text={i18n.t("login_via_email")} onPress={onLogin}/>
                        <XStack alignItems="center" gap={12}>
                            <View flex={1} borderTopWidth={1} borderTopColor="$gray-75"/>
                            <CustomText size="p1Light" color="$gray-60">{i18n.t("or")}</CustomText>
                            <View flex={1} borderTopWidth={1} borderTopColor="$gray-75"/>
                        </XStack>
                        <GoogleSignInButton onPress={onGoogleLogin} isLoading={googleLoading}/>
                    </YStack>
                )}
            </YStack>
        </YStack>
    );
};

export default Login;