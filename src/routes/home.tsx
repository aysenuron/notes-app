import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { Button } from "@/components/ui/button"
import CardItem from "@/components/ui/CardItem"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getNotes } from "@/utils/api"
import { Tag, Note } from "@/utils/types"
import { useUpdateURLParams } from "@/hooks/useUpdateURLParams"

import { X } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [searchParams] = useSearchParams();
  console.log(searchParams.toString());
  const updateParams = useUpdateURLParams();


  const tagsFilter = searchParams.get("tags")?.split(",") ?? [];
  const searchFilter = searchParams.get("search")?.toLowerCase() ?? "";

  useEffect(() => {
    async function loadNotes() {
      setLoading(true);
      try {
        const data: Note[] = await getNotes()
        const sortedNotes = [...data].sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setNotes(sortedNotes);
        const allTags = data.flatMap(note => note.tags);
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    }
    loadNotes()
  }, []);

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const searchWord = e.target.value.toLowerCase();
    updateParams("search", searchWord);
  }

  function tagHandler(tag: Tag) {
    let newTags: string[];
    tagsFilter.includes(tag) ? newTags = tagsFilter.filter(t => t !== tag): newTags = [...tagsFilter, tag];
    updateParams("tags", newTags);
  }

  const filteredNotes = notes.filter((note: Note) => {
    const matchesInput = note.content.toLowerCase().includes(searchFilter) || note.title.toLowerCase().includes(searchFilter);
    const matchesTag = tagsFilter.length === 0 || note.tags.some((tag: Tag) => tagsFilter.includes(tag));
    return matchesInput && matchesTag;
  });

  const noteElements = filteredNotes.map(note => (
    <Link to={`${note.id}`}
    state={{search: `?${searchParams.toString()}`}}
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
        <div className="flex gap-4">
          <Input onChange={inputHandler} className="w-full lg:w-1/2 xl:w-1/3" type="text" placeholder="Search" value={searchFilter ? searchFilter : ""} />
          {searchFilter && <Button onClick={() => updateParams("search", "")}>Clear</Button>}
        </div>
        <div className="flex gap-2 mt-5 flex-wrap">
          {tags.map(tag => (
            <Badge key={tag} variant={tagsFilter.includes(tag) ? "default" : "secondary"} className="cursor-pointer" onClick={() => tagHandler(tag)}>
            {tag} {tagsFilter.includes(tag) && <Button variant={"secondary"} className="ml-0.5 h-1 w-1 rounded-full"><X /></Button>}
            </Badge>
          ))}
            </div>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">
          {loading ? <h2>Notes are loading...</h2> : noteElements}
        </main>
        <Link
        to={`new`}
        state={{search: `?${searchParams.toString()}`}}
        >
          <Button size={"lg"} className="fixed drop-shadow-lg bottom-5 right-5 lg:bottom-10 lg:right-10 rounded-full hover:shadow-none">
            + Create new note
          </Button>
        </Link>
        </>
    );
}