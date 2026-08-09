import {AudioModule} from "expo-audio";
import LiveAudioStream from "react-native-live-audio-stream";

import {base64ToUint8Array} from "@/utils/base64";

// Мають збігатися з SAMPLE_RATE у book-wise-be-python/services/vosk_service.py
export const AUDIO_SAMPLE_RATE = 16000;

const AUDIO_SOURCE_VOICE_RECOGNITION = 6; // Android MediaRecorder.AudioSource

export const requestMicrophonePermission = async (): Promise<boolean> => {
    const status = await AudioModule.requestRecordingPermissionsAsync();
    return status.granted;
};

export const startAudioStream = (onChunk: (chunk: Uint8Array) => void): void => {
    LiveAudioStream.init({
        sampleRate: AUDIO_SAMPLE_RATE,
        channels: 1,
        bitsPerSample: 16,
        audioSource: AUDIO_SOURCE_VOICE_RECOGNITION,
        // 2048 байт = ~64мс при 16kHz/16bit mono — частіші чанки зменшують
        // затримку появи partial-результатів у Vosk (було 4096 = ~128мс).
        bufferSize: 2048,
        // Бібліотека вимагає ім'я файлу навіть коли він не потрібен — аудіо ми
        // самі зберігаємо на бекенді (Python), цей файл ніде не читаємо.
        wavFile: "reading-speed-stream.wav",
    });

    LiveAudioStream.on("data", (base64Chunk: string) => {
        onChunk(base64ToUint8Array(base64Chunk));
    });

    LiveAudioStream.start();
};

export const stopAudioStream = (): void => {
    LiveAudioStream.stop();
};
