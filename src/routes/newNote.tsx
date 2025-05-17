import { useEffect, useState } from "react";
import type { Tag, Note } from "@/utils/types";
import { getNotes } from "@/utils/api";
import GoBackButton from "@/components/ui/goBackButton"
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewNote() {
    const [textTag, setTextTag] = useState<string>("");
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    useEffect(() => {
        async function loadTags() {
          try {
            const data: Note[] = await getNotes()
            const allTags = data.flatMap(note => note.tags);
            const uniqueTags = [...new Set(allTags)];
            setTags(uniqueTags);
          } catch (error) {
            console.error("Error fetching all tags", error);
          }
        }
        loadTags()
      }, []);

      const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tagValue = e.target.value;
        setTextTag(tagValue);

        const matchTag = tags.filter(tag => tag.includes(tagValue));
        setFilteredTags(matchTag);
      };

      const filteredTagsElement = filteredTags.map(tag => (
        <div key={tag}>
            <Button className="m-2" variant={"ghost"} onClick={() => selectTags(tag)}>
                <p>{tag}</p>
            </Button>
            {tag === filteredTags[filteredTags.length - 1] ? null : <Separator className="my-2" />}
        </div>
      ));

      const selectTags = (tag: Tag) => {
        if(!selectedTags.includes(tag)) {
            setSelectedTags(prevTags => [...prevTags, tag]);
        }
        setTextTag("");
        setFilteredTags([]);
      };

      const handleNewTag = (tagValue: Tag) => {
        if(!selectedTags.includes(tagValue)) {
            setSelectedTags(prevTags => [...prevTags, tagValue]);
        }
        setTextTag("");
      }

      const selectedTagElements = selectedTags.map(tag => <Badge key={tag}>{tag}</Badge>);

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
                    <div className="mt-8">
                        <Textarea placeholder="Type your note here." />
                    </div>
                    <div className="mt-8 bg-secondary p-6 rounded-2xl w-full lg:w-1/2">
                        <div className="flex w-full items-center space-x-2">
                            <div className="relative w-full">
                                <Input className="bg-background" type="text" value={textTag} onChange={handleTagInputChange} placeholder="Add tag..." />
                                {textTag 
                                ? 
                                <div className="absolute mt-4">
                                <ScrollArea className="w-48 bg-background rounded-md border border-secondary-foreground">
                                    {filteredTagsElement}
                                </ScrollArea>
                                </div>
                                : null
                                }
                            </div>
                            <Button onClick={() => handleNewTag(textTag)} type="button">Add</Button>
                        </div>
                        <div className="flex gap-2 mt-4">
                            {selectedTagElements}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}