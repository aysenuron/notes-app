import { Link, useLocation } from "react-router"
import { ArrowLeft } from 'lucide-react';

export default function GoBackButton() {
    const location = useLocation();
    const search = location.state?.search || ""; 
    return (
        <Link to={`..${search}`} relative="path"><ArrowLeft className="text-foreground" /></Link>
    )
}