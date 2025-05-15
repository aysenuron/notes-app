import { useEffect, useState } from "react"
import { Link, useSearchParams, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import CardItem from "@/components/ui/CardItem"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getNotes } from "@/utils/api"
import { Tag, Note } from "@/utils/types"

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tagsFilter = searchParams.get("tags")?.split(",") ?? [];
  const searchFilter = searchParams.get("search")?.toLowerCase() ?? "";
  console.log(tagsFilter, searchFilter);

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
    updateURLParams("search", searchWord);
  }

  function tagHandler(tag: Tag) {
    let newTags: string[];
    tagsFilter.includes(tag) ? newTags = tagsFilter.filter(t => t !== tag): newTags = [...tagsFilter, tag];
    updateURLParams("tags", newTags);
  }

  const filteredNotes = notes.filter((note: Note) => {
    const matchesInput = note.content.toLowerCase().includes(searchFilter) || note.title.toLowerCase().includes(searchFilter);
    const matchesTag = tagsFilter.length === 0 || note.tags.some((tag: Tag) => tagsFilter.includes(tag));
    return matchesInput && matchesTag;
  });

  function updateURLParams(key: string, value: string | string[] | null) {
    const params = new URLSearchParams(searchParams);
  
    if (value && (Array.isArray(value) ? value.length > 0 : value !== "")) {
      params.set(key, Array.isArray(value) ? value.join(",") : value);
    } else {
      params.delete(key);
    }
    navigate(`?${params.toString()}`);
  }

  const noteElements = filteredNotes.map(note => (
    <Link to={`/${note.id}`}
    key={note.id}>
    <CardItem
    title={note.title}
    content={note.content}
    createdAt={note.createdAt}
    updatedAt={note.updatedAt}
    tags={note.tags}
    />
    </Link>
  ))

    return (
        <>
        <div><Input onChange={inputHandler} className="w-full lg:w-1/2 xl:w-1/3" type="text" placeholder="Search" /></div>
        <div className="flex gap-2 mt-5 flex-wrap">{tags.map(tag => <Badge key={tag} variant={tagsFilter.includes(tag) ? "default" : "secondary"} className="cursor-pointer" onClick={() => tagHandler(tag)}>{tag}</Badge>)}</div>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">
          {loading ? <h2>Notes are loading...</h2> : noteElements}
        </main>
        <Button size={"lg"} className="fixed drop-shadow-lg bottom-5 right-5 lg:bottom-10 lg:right-10 rounded-full hover:shadow-none">+ Create new note</Button>
        </>
    );
}