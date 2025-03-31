import {getLocales} from "expo-localization";
import {I18n} from "i18n-js";

import de from "@/localization/de";
import en from "@/localization/en";

const messages = {
    en: en,
    de: de,
};

const i18n = new I18n(messages);

const deviceLocale = getLocales()[0].languageCode || "en";

i18n.locale = Object.keys(messages).includes(deviceLocale) ? deviceLocale : "en";

export const currentDeviceLocale = getLocales()[0].languageCode!;

export default i18n;