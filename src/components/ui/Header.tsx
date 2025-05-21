import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router"

export default function Header() {
    return (
        <header className="flex justify-between py-4 mb-5 md:mb-8">
            <Link to={"/"}><h1>Notes app</h1></Link>    
            <ModeToggle />
        </header>
    )
}