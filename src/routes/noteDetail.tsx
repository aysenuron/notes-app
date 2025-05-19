import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"
import GoBackButton from "@/components/ui/goBackButton";
import { getNote, deleteNote } from "@/utils/api";
import type { Note } from "@/utils/types";
import NoteItem from "@/components/noteItem";
import { Button } from "@/components/ui/button";
import { SquarePen } from 'lucide-react';
import { Trash } from 'lucide-react';

export default function Note() {
    const [loading, setLoading] = useState<boolean>(false);
    const [note, setNote] = useState<Note | null>(null)

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadNote() {
            setLoading(true);
            try {
                const data = await getNote(Number(params.id));
                setNote(data);
            } catch (error) {
                console.error("There was an error uploading the note.");
            } finally {
                setLoading(false);
            }
        };
        loadNote();
    }, [params.id])

    const handleDelete = async () => {
        try {
            if(note) {
                await deleteNote(note.id);
                navigate("/");
            } else {
                console.error("There was an error uploading the note.");
            }
            
        } catch (error) {
            console.error("Error saving note:", error);
        }
    }

    const handleEdit = () => {

    }

    const noteElement = note ? 
    <NoteItem note={note} />
    : <h2>Note doesn't exist</h2>

    return (
        <>
        <div className="mb-8 flex justify-between">
            <GoBackButton />
            <div className="flex gap-5 items-center">
                <Button onClick={handleDelete} variant={"ghost"}>
                    <Trash className="h-4 text-foreground" />
                </Button>
                <Button onClick={handleEdit} variant={"outline"}><SquarePen className="w-4 h-4" /></Button>
                </div>
        </div>
        <div>
            {loading ? <h2>The note is loading...</h2> : noteElement}
        </div>
        </>
    )
}