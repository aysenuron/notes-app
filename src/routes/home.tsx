import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import CardItem from "@/components/ui/CardItem"
import { Input } from "@/components/ui/input"
import { getNotes } from "@/utils/api"
import { Note } from "@/utils/types"

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    async function loadNotes() {
      setLoading(true);
      try {
        const data: Note[] = await getNotes()
        setNotes(data);
      } catch (error) {
        TypeError("There was an error fetching data.")
      } finally {
        setLoading(false);
      }
    }
    loadNotes()
  }, []);

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const searchWord = e.target.value.toLowerCase();
    setInputText(searchWord);
  }

  const filteredNotes = notes.filter(note => {
    if(!inputText) {
      return note;
    } else {
      const lowerCase = inputText.toLowerCase();
      return note.content.toLowerCase().includes(lowerCase) || note.title.toLowerCase().includes(lowerCase);
    };
  });

  const noteElements = filteredNotes.map(note => (
    <CardItem
    key={note.id}
    title={note.title}
    content={note.content}
    createdAt={note.createdAt}
    updatedAt={note.updatedAt}
    tags={note.tags}
    />
  ))

    return (
        <>
        <div><Input onChange={inputHandler} className="w-full lg:w-1/2 xl:w-1/3" type="text" placeholder="Search" /></div>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">
          {loading ? <h2>Notes are loading...</h2> : noteElements}
        </main>
        <Button size={"lg"} className="fixed drop-shadow-lg bottom-5 right-5 lg:bottom-10 lg:right-10 rounded-full hover:shadow-none">Create new note</Button>
        </>
    )
}