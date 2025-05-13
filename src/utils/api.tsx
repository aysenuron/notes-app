import { Note } from "./types";

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