import { useNavigate } from "react-router";
import { useState } from "react";
import type { Tag } from "@/utils/types";
import { createNote } from "@/utils/api";
import { handleInputChange } from "@/utils/functions";
import GoBackButton from "@/components/ui/goBackButton"
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from 'lucide-react';
import { useLoadTags } from "@/hooks/useLoadTags";

export default function NewNote() {
    const [textTag, setTextTag] = useState<string>("");
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteContent, setNoteContent] = useState<string>("");

    let navigate = useNavigate();
    const tags = useLoadTags();

      const handleDiscard = () => {
        setNoteTitle("");
        setNoteContent("");
        setFilteredTags([]);
        navigate("/");
      }

      const handleSave = async () => {
        try {
              const title = noteTitle ? noteTitle : "A wonderful new note"
              const content = noteContent ? noteContent : "Keep calm and write something"
              const tags = selectedTags
              await createNote(title, content, tags);

              setNoteTitle("");
              setNoteContent("");
              setFilteredTags([]);
              navigate("/");
        } catch (error) {
            console.error("Error saving note:", error);
        }
      }

      const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tagValue = e.target.value;
        setTextTag(tagValue);

        const matchTag = tags.filter(tag => tag.includes(tagValue));
        setFilteredTags(matchTag);
      };

      const filteredTagsElement = filteredTags.map(tag => (
        <div key={tag}>
            <Button className="m-2 text-foreground" variant={"ghost"} onClick={() => selectTags(tag)}>
                {tag}
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

      const removeTag = (tag: Tag) => {
        if(selectedTags.includes(tag)) {
            setSelectedTags(prevTags => prevTags.filter(t => t !== tag))
        }
      };

      const selectedTagElements = selectedTags.map(tag => <Badge key={tag}>{tag} <Button onClick={() => removeTag(tag)} variant={"secondary"} className="ml-0.5 h-1 w-1 rounded-full"><X /></Button></Badge>);

    return (
        <>
            <div className="flex justify-between items-center">
                <GoBackButton />
                <div className="flex gap-5 items-center">
                <Button onClick={handleDiscard} variant={"ghost"}>
                    <Trash className="h-4 text-foreground" />
                </Button>
                <Button onClick={handleSave}>Save</Button>
                </div>
            </div>
            <div className="mt-5">
                    <Input onChange={(e) => handleInputChange(e, setNoteTitle)} value={noteTitle} type="text" placeholder="Title" className="w-full md:w-1/3" />
                    <div className="mt-8">
                        <Textarea onChange={(e) => handleInputChange(e, setNoteContent)} value={noteContent} placeholder="Type your note here." className="text-foreground" />
                    </div>
                    <div className="mt-8 bg-secondary p-6 rounded-2xl w-full lg:w-1/2">
                            <div className="flex w-full items-center space-x-2">

                                <div className="relative w-full">
                                    <Input className="bg-background" 
                                    type="text" value={textTag} 
                                    onChange={handleTagInputChange} 
                                    placeholder="Add tag..."
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleNewTag(textTag); } }}
                                    />
                                    {(filteredTags.length > 0)
                                    ? 
                                    <div className="absolute mt-4">
                                    <ScrollArea className="w-48 bg-background rounded-md border border-secondary-foreground">
                                        {filteredTagsElement}
                                    </ScrollArea>
                                    </div>
                                    : null
                                    }
                                </div>
                                <Button onClick={() => handleNewTag(textTag)} type="submit">Add</Button>
                            </div>
                        <div className="flex gap-2 mt-4 flex-wrap">
                            {selectedTagElements}
                        </div>
                    </div>
            </div>
        </>
    )
}