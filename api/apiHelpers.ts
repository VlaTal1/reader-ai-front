import {ApiResponse} from "@/api/index";

export const returnSuccessData = async <T>(data: unknown) => (
    {
        success: true,
        data: data as T,
    } as ApiResponse<T>
);

export const sanitizeDataForSentry = (data: unknown, maxDepth = 3, currentDepth = 0): unknown => {
    if (currentDepth > maxDepth) {
        return "[DEPTH EXCEEDED]";
    }

    if (typeof data === "string") {
        return data.length > 1000 ? data.substring(0, 1000) + "... [TRUNCATED]" : data;
    }

    if (Array.isArray(data)) {
        const truncated = data.length > 20 ? data.slice(0, 20) : data;
        return truncated.map(item => sanitizeDataForSentry(item, maxDepth, currentDepth + 1));
    }

    if (typeof data === "object" && data !== null) {
        const sanitized: Record<string, unknown> = {};
        const sensitiveKeys = ["password", "token", "secret", "key", "auth", "credit", "card"];

        for (const [key, value] of Object.entries(data)) {
            if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
                sanitized[key] = "[FILTERED]";
            } else {
                sanitized[key] = sanitizeDataForSentry(value, maxDepth, currentDepth + 1);
            }
        }

        return sanitized;
    }

    return data;
};