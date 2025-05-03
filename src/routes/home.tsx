import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
const CardItem = () => {
    return (
        <Card className="hover:drop-shadow-xl cursor-pointer transition-all duration-200 border-gray-300 dark:border-gray-700 hover:dark:border-gray-500">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

    )
}
export default function Home() {
    return (
        <>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </main>
        <Button size={"lg"} className="fixed drop-shadow-lg bottom-5 right-5 rounded-full text-xl h-14 w-14">+</Button>
        </>
    )
}