import { useParams, useNavigate } from "react-router"
import type { Note, Tag } from "@/utils/types"
import { handleInputChange } from "@/utils/functions";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { getNote } from "@/utils/api";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useLoadTags } from "@/hooks/useLoadTags";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import GoBackButton from "@/components/ui/goBackButton";
import { editNote } from "@/utils/api";

export default function EditNote() {
    const [note, setNote] = useState<Note | null>(null);

    const [textTag, setTextTag] = useState<string>("");
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(note ? note.tags : []);

    const [noteContent, setNoteContent] = useState<string>(note ? note.content : "Note doesn't exist.");
    const [noteTitle, setNoteTitle] = useState<string>(note ? note.title : "Note doesn't exist.");

    const params = useParams();
    const tags = useLoadTags();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadNote() {
            try {
                const data = await getNote(Number(params.id));
                console.log(data);
                setNote(data);
            } catch (error) {
                console.error("There was an error uploading the note.");
            }
        };
        loadNote();
    }, [params.id]);

    useEffect(() => {
        if (note) {
          setNoteTitle(note.title);
          setNoteContent(note.content);
          setSelectedTags(note.tags);
        }
      }, [note]);

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

      const handleSave = async () => {
        try {
              const title = noteTitle;
              const content = noteContent;
              const tags = selectedTags;
              const id = Number(params.id);
              await editNote(id, title, content, tags);

              setNoteTitle("");
              setNoteContent("");
              setFilteredTags([]);
              navigate(`/${id}`);
        } catch (error) {
            console.error("Error updating note:", error);
        }
      }

    return (
        <>
        <div className="flex justify-between items-center mb-4">
                <GoBackButton id={Number(params.id)} />
                <Button onClick={handleSave}>Save</Button>
        </div>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <Input onChange={(e) => handleInputChange(e, setNoteTitle)} value={noteTitle} type="text" placeholder="Title" className="w-full md:w-1/3" />
            </div>
            <div>
                <Textarea onChange={(e) => handleInputChange(e, setNoteContent)} value={noteContent} placeholder="Type your note here." className="text-foreground" />
            </div>
            <div className="bg-secondary p-6 rounded-2xl w-full lg:w-1/3">
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