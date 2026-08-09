import Constants from "expo-constants";

import {getAccessToken} from "@/auth/supabase";
import {ReadingSpeedServerMessage, ReferenceTextMessage, ResultMessage, WordEventMessage} from "@/types/ReadingSpeed";

const getWsBaseUrl = (): string => {
    const envVars = Constants.expoConfig?.extra;
    if (!envVars?.["pythonWsBaseUrl"]) {
        throw new Error("Python WS base URL is not set");
    }
    return envVars["pythonWsBaseUrl"];
};

export interface ReadingSpeedSocketHandlers {
    onWordEvent?: (message: WordEventMessage) => void;
    onResult?: (message: ResultMessage) => void;
    onError?: (error: unknown) => void;
    onClose?: () => void;
}

// Один інстанс = один сеанс читання (один WS-конект). connect() резолвиться
// щойно приходить перше повідомлення "reference" — гарантує, що еталонний
// текст уже на клієнті до старту запису мікрофона.
export class ReadingSpeedSocket {
    private ws: WebSocket | null = null;

    async connect(participantId: string, textId: string, handlers: ReadingSpeedSocketHandlers): Promise<ReferenceTextMessage> {
        const token = await getAccessToken();
        if (!token) {
            throw new Error("No access token available");
        }

        const baseUrl = getWsBaseUrl();
        const params = new URLSearchParams({token, participant_id: participantId, text_id: textId});
        const url = `${baseUrl}/ws/reading-speed?${params.toString()}`;

        return new Promise((resolve, reject) => {
            const ws = new WebSocket(url);
            this.ws = ws;
            let referenceReceived = false;

            ws.onmessage = (event) => {
                try {
                    const message: ReadingSpeedServerMessage = JSON.parse(event.data);
                    if (message.type === "reference") {
                        referenceReceived = true;
                        resolve(message);
                    } else if (message.type === "word_event") {
                        handlers.onWordEvent?.(message);
                    } else if (message.type === "result") {
                        handlers.onResult?.(message);
                    }
                } catch (e) {
                    handlers.onError?.(e);
                }
            };

            ws.onerror = (event) => {
                if (!referenceReceived) {
                    reject(event);
                }
                handlers.onError?.(event);
            };

            ws.onclose = () => {
                handlers.onClose?.();
            };
        });
    }

    sendAudioChunk(chunk: Uint8Array): void {
        this.ws?.send(chunk);
    }

    stop(): void {
        this.ws?.send("stop");
    }

    close(): void {
        this.ws?.close();
        this.ws = null;
    }
}
