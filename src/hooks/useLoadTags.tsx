import { useState, useEffect } from "react";
import type { Tag, Note } from "@/utils/types";
import { getNotes } from "@/utils/api";

export function useLoadTags() {
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        const fetchTags = async function loadTags() {
            try {
                const data: Note[] = await getNotes()
                const allTags = data.flatMap(note => note.tags);
                const uniqueTags = [...new Set(allTags)];
                setTags(uniqueTags);
              } catch (error) {
                console.error("Error fetching all tags", error);
              }
        }
        fetchTags();
    }, [])
    return tags;
} 