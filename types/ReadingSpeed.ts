export type WordStatus = "correct" | "error" | "skipped" | "not_in_vocabulary";

export interface ReferenceWord {
    index: number;
    word: string;
    in_vocabulary: boolean;
}

export interface ReferenceTextMessage {
    type: "reference";
    text_id: string;
    title: string;
    words: ReferenceWord[];
}

export interface WordEventMessage {
    type: "word_event";
    index: number;
    status: WordStatus;
    // Чорновий прогноз, ще не підтверджений (може бути перезаписаний пізніше
    // тим самим index'ом з tentative=false) — рендериться менш насичено.
    tentative: boolean;
}

export interface ReadingSpeedMetrics {
    total_words: number;
    correct_count: number;
    error_count: number;
    skipped_count: number;
    not_in_vocabulary_count: number;
    duration_seconds: number;
    wpm: number;
    accuracy: number;
}

export interface ResultMessage {
    type: "result";
    text_id: string;
    metrics: ReadingSpeedMetrics;
}

export type ReadingSpeedServerMessage = ReferenceTextMessage | WordEventMessage | ResultMessage;
