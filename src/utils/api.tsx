import { Note, Tag } from "./types";

export async function getNotes(): Promise<Note[]> {
    const res = await fetch("https://681f0c49c1c291fa6635d23c.mockapi.io/api/notes");
    const data = await res.json();
    return data;
}

export async function getNote(id: number): Promise<Note> {
    const res = await fetch(`https://681f0c49c1c291fa6635d23c.mockapi.io/api/notes/${id}`);
    const data = await res.json();
    console.log(data)
    return data;
}

export async function createNote(title: string, content: string, tags: Tag[]) {
    try {
        const res = await fetch("https://681f0c49c1c291fa6635d23c.mockapi.io/api/notes", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content,
                createdAt: Date.now(),
                tags: tags
            })
        });
        if(!res.ok) {
            throw new Error(`Failed to create note: ${res.status}`);
        }
        const data = await res.json()
        return data;
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
}

export async function deleteNote(id: number) {
    try {
        const res = await fetch(`https://681f0c49c1c291fa6635d23c.mockapi.io/api/notes/${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if(!res.ok) {
            throw new Error(`Failed to delete note: ${res.status}`);
        }
        const data = await res.json()
        return data;
    } catch (error) {
        console.error("Error deleting note:", error);
        throw error;
    }
}

export async function editNote(id: number, title: string, content: string, tags: Tag[]) {
    try {
        const res = await fetch(`https://681f0c49c1c291fa6635d23c.mockapi.io/api/notes/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content,
                updatedAt: Math.floor(Date.now() / 1000),
                tags: tags
            })
        });
        if(!res.ok) {
            throw new Error(`Failed to update note: ${res.status}`);
        }
        const data = await res.json()
        return data;
    } catch (error) {
        console.error("Error updating note:", error);
        throw error;
    }
}