import { useEffect, useState } from "react";
import { useParams, Link } from "react-router"

import { getNote } from "@/utils/api";
import type { Note } from "@/utils/types";
import NoteItem from "@/components/noteItem";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { SquarePen } from 'lucide-react';

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

    const noteElement = note ? 
    <NoteItem note={note} />
    : <h2>Note doesn't exist</h2>

    return (
        <>
        <div className="mb-8 flex justify-between">
            {
                <Link to={".."} relative="path"><ArrowLeft className="text-foreground" /></Link>
            }
            <Button variant={"outline"}>
                {
                    <SquarePen className="w-4 h-4" />
                }
            </Button>
        </div>
        <div>
            {loading ? <h2>The note is loading...</h2> : noteElement}
        </div>
        </>
    )
}