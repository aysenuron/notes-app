import { Note } from "@/utils/types";
import { Badge } from "./badge";
import { formatDate } from "@/utils/functions";
import { getPreview } from "@/utils/functions";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  type Props = Omit<Note, "id">
  
const CardItem = ({title, content, createdAt, updatedAt, tags}: Props) => {
    return (
<Card className="hover:drop-shadow-xl cursor-pointer transition-all duration-200 border-gray-300 dark:border-gray-700 hover:dark:border-gray-500">
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{updatedAt ? formatDate(updatedAt) : formatDate(createdAt)}</CardDescription>
  </CardHeader>
  <CardContent>
    <p>{getPreview(content)}</p>
  </CardContent>
  <CardFooter>
    <div className="flex gap-2">
        {tags.map((tag, index) => <Badge key={index} variant={"secondary"}>{tag}</Badge>)}
    </div>
  </CardFooter>
</Card>

    )
}

export default CardItem;