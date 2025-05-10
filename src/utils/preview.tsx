export const getPreview = (text: string, wordCount: number = 20) => {
    const words = text.split(" ")
    return words.slice(0, wordCount).join(" ") + (words.length > wordCount ? "..." : "");
};