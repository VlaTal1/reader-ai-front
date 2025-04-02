import {createClient} from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import Constants from "expo-constants";

const envVars = Constants.expoConfig!.extra!;

const supabaseUrl = envVars["supabaseUrl"]!
const supabaseAnonKey = envVars["supabaseAnonKey"]!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

export const getAccessToken = async () => {
    const {data} = await supabase.auth.getSession();
    if (data.session) {
        return data.session.access_token;
    }

    return null;
};