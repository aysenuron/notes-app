import { Outlet } from "react-router"
import Header from "@/components/ui/Header"
export default function Layout() {
    return (
        <div className="container px-4 md:px-0 mx-auto py-5">
            <Header />
            <Outlet />
        </div>
        
    )
}