const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// react-native-live-audio-stream доставляє PCM-чанки як base64-рядки; тут
// декодуємо їх у Uint8Array для відправки бінарним WS-фреймом. Без
// зовнішньої залежності (Buffer доступний не в усіх RN-середовищах).
export const base64ToUint8Array = (base64: string): Uint8Array => {
    const cleaned = base64.replace(/[^A-Za-z0-9+/]/g, "");
    const bytes: number[] = [];
    let buffer = 0;
    let bits = 0;

    for (const char of cleaned) {
        const value = BASE64_CHARS.indexOf(char);
        if (value === -1) {
            continue;
        }
        buffer = (buffer << 6) | value;
        bits += 6;
        if (bits >= 8) {
            bits -= 8;
            bytes.push((buffer >> bits) & 0xff);
        }
    }

    return Uint8Array.from(bytes);
};
