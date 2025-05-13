import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import CardItem from "@/components/ui/CardItem"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getNotes } from "@/utils/api"
import { Tag, Note } from "@/utils/types"
import { el } from "date-fns/locale"

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function loadNotes() {
      setLoading(true);
      try {
        const data: Note[] = await getNotes()
        setNotes(data);
        const allTags = data.flatMap(note => note.tags);
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
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

  function tagHandler(tag: Tag) {
    setSelectedTags(prevTags => (
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]));
  }

  const filteredNotes = notes.filter((note: Note) => {
    const lowerCase = inputText.toLowerCase();
    const matchesInput = note.content.toLowerCase().includes(lowerCase) || note.title.toLowerCase().includes(lowerCase);
    const matchesTag = selectedTags.length === 0 || note.tags.some((tag: Tag) => selectedTags.includes(tag));
    return matchesInput && matchesTag;
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
        <div className="flex gap-2 mt-5 flex-wrap">{tags.map(tag => <Badge key={tag} variant={selectedTags.includes(tag) ? "default" : "secondary"} className="cursor-pointer" onClick={() => tagHandler(tag)}>{tag}</Badge>)}</div>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">
          {loading ? <h2>Notes are loading...</h2> : noteElements}
        </main>
        <Button size={"lg"} className="fixed drop-shadow-lg bottom-5 right-5 lg:bottom-10 lg:right-10 rounded-full hover:shadow-none">Create new note</Button>
        </>
    );
}