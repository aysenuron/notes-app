import { Button } from "./button"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
    return (
        <header>
            <Button>Light mode</Button>
            <ModeToggle />
        </header>
    )
}