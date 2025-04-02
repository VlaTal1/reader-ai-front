import i18n from "@/localization/i18n";

export const isBlank = (str?: string) => (!str || /^\s*$/.test(str));

export const isValidEmail = (email: string): boolean => {
    return /^[^@]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) && (email.match(/@/g)?.length === 1);
}

export const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
}

export const getLanguages = () => {
    return [
        {name: i18n.t("language_english"), flag: "🇺🇲", code: "en"},
        {name: i18n.t("language_german"), flag: "🇩🇪", code: "de"},
    ];
}

export const getLanguageByCode = (code: string) => {
    return getLanguages().find(lang => lang.code === code)?.name || "en";
}

export const addOpacityToHex = (hex: string, opacity: number) => {
    const alpha = Math.round(opacity * 255).toString(16).padStart(2, "0");
    return hex + alpha;
};