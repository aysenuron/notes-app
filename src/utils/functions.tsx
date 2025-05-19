import { format } from "date-fns";

export const getPreview = (text: string, wordCount: number = 20) => {
    const words = text.split(" ")
    return words.slice(0, wordCount).join(" ") + (words.length > wordCount ? "..." : "");
};

export const formatDate = (timestamp: number) => format(new Date(timestamp * 1000), "PPP");

export const handleInputChange = 
<T extends HTMLInputElement | HTMLTextAreaElement>
(e: React.ChangeEvent<T>, setValue: React.Dispatch<React.SetStateAction<string>>) => {
  const value = e.target.value;
  setValue(value);
}