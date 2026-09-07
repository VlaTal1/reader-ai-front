// Shared avatar coloring for participant initials — cycles through the app's
// five brand hues instead of an arbitrary palette, so avatars always match
// the rest of the "Warm Reading Nook" design system.
export const AVATAR_PALETTE = [
    {bg: "#FBEAD9", text: "#A8451F"}, // terracotta
    {bg: "#E1F0EA", text: "#255A50"}, // teal
    {bg: "#F5E9F1", text: "#7C3D6A"}, // plum
    {bg: "#FBF0D9", text: "#B07A1E"}, // gold
    {bg: "#E7F3EA", text: "#2F6B45"}, // sage
];

export const getAvatarColor = (name: string | undefined) => {
    const nameCode = name
        ? name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
        : 0;
    return AVATAR_PALETTE[nameCode % AVATAR_PALETTE.length];
};

export const getInitial = (name: string | undefined) =>
    name ? name.charAt(0).toUpperCase() : "?";
