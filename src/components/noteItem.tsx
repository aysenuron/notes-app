import type { Note } from "@/utils/types"
import { formatDate } from "@/utils/functions";
import { Badge } from "@/components/ui/badge";

export default function NoteItem({note}: {note: Note}) {
    return (
        <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
            <h2>{note.title}</h2> 
            <div className="flex gap-2">{note.tags.map(tag => <Badge key={tag} variant={"secondary"}>{tag}</Badge>)}</div>
            <p className="text-sm text-gray-500">{note.updatedAt ? formatDate(note.updatedAt) : formatDate(note.createdAt)}</p>
        </div>
        <div>
            <p>{note.content}</p>
        </div>
    </div>
    )
}