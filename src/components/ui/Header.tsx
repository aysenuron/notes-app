import { ModeToggle } from "./mode-toggle"

export default function Header() {
    return (
        <header className="flex justify-between py-4 mb-5 md:mb-8">
            <h1>Notes app</h1>
            <ModeToggle />
        </header>
    )
}