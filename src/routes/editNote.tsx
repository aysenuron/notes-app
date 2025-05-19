import { useParams } from "react-router"

export default function EditNote() {
    const params = useParams();

    return (
        <h2>edit note {params.id}</h2>
    )
}