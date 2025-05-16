import { useEffect, useState } from "react";
import type { Tag, Note } from "@/utils/types";
import { getNotes } from "@/utils/api";
import GoBackButton from "@/components/ui/goBackButton"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewNote() {
    const [loading, setLoading] = useState<boolean>(false);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        async function loadTags() {
          setLoading(true);
          try {
            const data: Note[] = await getNotes()
            const allTags = data.flatMap(note => note.tags);
            const uniqueTags = [...new Set(allTags)];
            setTags(uniqueTags);
          } catch (error) {
            console.error("Error fetching notes:", error);
          } finally {
            setLoading(false);
          }
        }
        loadTags()
      }, []);

      const tagElements = tags.map(tag => <Badge variant={"outline"} key={tag}>{tag}</Badge>)

    return (
        <>
            <div className="flex justify-between items-center">
                <GoBackButton />
                <div className="flex gap-5 items-center">
                <Button variant={"ghost"}>
                    <Trash className="h-4" />
                </Button>
                <Button>Save</Button>
                </div>
            </div>
            <div className="mt-5">
                <form action="">
                    <Input type="text" placeholder="Title" className="w-full md:w-1/3" />
                    <div className="mt-8 bg-gray-100 p-6 rounded-2xl">
                        <div className="flex w-full items-center space-x-2">
                            <Input className="bg-background" type="text" placeholder="Add tag..." />
                            <Button type="button">Add</Button>
                        </div>
                        <div className="flex gap-4 mt-8">
                            {loading ? <p>Tags loading...</p> : tagElements}
                        </div>
                    </div>
                    <div className="mt-8">
                        <Textarea placeholder="Type your note here." />
                    </div>
                </form>
            </div>
        </>
    )
}