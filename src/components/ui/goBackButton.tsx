import { Link, useLocation } from "react-router"
import { ArrowLeft } from 'lucide-react';

interface GoBackButtonProps {
    id?: number;
  }

export default function GoBackButton({id}: GoBackButtonProps)  {
    const location = useLocation();
    const search = location.state?.search || ""; 
    const path = () => { 
        if(id) {
            return `/${id}`
        } else if(search) {
            return `../${search}`
        } else {
            return "..";
        }
    } 

    return (
        <Link to={path()} relative="path"><ArrowLeft className="text-foreground" /></Link>
    )
}