import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router"
import GoBackButton from "@/components/ui/goBackButton";
import { getNote, deleteNote } from "@/utils/api";
import type { Note } from "@/utils/types";
import NoteItem from "@/components/noteItem";
import { Button } from "@/components/ui/button";
import { SquarePen } from 'lucide-react';
import { Trash } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

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
    }, [params.id]);

    const AlertDialogElement = () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"ghost"}>
                    <Trash className="h-4 text-foreground" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your note
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

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

    const noteElement = note ? 
    <NoteItem note={note} />
    : <h2>Note doesn't exist</h2>

    return (
        <>
        <div className="mb-8 flex justify-between">
            <GoBackButton />
            <div className="flex gap-5 items-center">
                <AlertDialogElement />
                <Link to={note ? `/edit/${note.id}` : "/"}>
                    <Button variant={"outline"}><SquarePen className="w-4 h-4 text-foreground" /></Button>
                </Link>
                </div>
        </div>
        <div>
            {loading ? <h2>The note is loading...</h2> : noteElement}
        </div>
        </>
    )
}