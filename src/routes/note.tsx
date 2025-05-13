import { useEffect, useState } from "react";
import { useParams } from "react-router"

import { getNote } from "@/utils/api";
import type { Note } from "@/utils/types";

export default function Note() {
    const [loading, setLoading] = useState<boolean>(false);
    const [note, setNote] = useState<Note | null>(null)

    const params = useParams();

    useEffect(() => {
        async function loadNote() {
            setLoading(true);
            try {
                const data = await getNote(Number(params.id));
                setNote(data);
            } catch (error) {
                TypeError("There was an error uploading the note.")
            } finally {
                setLoading(false);
            }
        };
        loadNote();
    }, [params.id])

    const noteElement = note ? <h2>{note.title}</h2> : <h2>Note doesn't exist</h2>

    return (
        <>
            {loading ? <h2>The note is loading...</h2> : noteElement}
        </>
    )
}