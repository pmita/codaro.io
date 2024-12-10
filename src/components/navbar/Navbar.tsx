import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"

export async function Navbar() {
  return (
    <nav className="container min-h-10 w-screen p-4 sm:p-10 md:p-8 flex justify-between items-center bg-white">
      <div className="flex justify-center items-center">
        <Link href={"/"}>
          <h2 
            className="text-2xl font-poppins font-bold"
          >
            Codaro<span className="text-primary">.io</span>
          </h2>
        </Link>
      </div>
      <ul className="flex-1 flex justify-end items-center gap-5 content-between">
        <li className="hover:scale-105 hover:opacity-75 font-semibold">
          <Link href={"/pro"}>
            Blog
            </Link>
          </li>
        <li className="hover:scale-105 hover:opacity-75 font-semibold">
          <Link href={"/blog"}>
            Blog
            </Link>
          </li>
        <li className="hover:scale-105 hover:opacity-75 font-semibold">
          <Link href={"/courses"}>
            Courses
          </Link>
        </li>
        <li className="hover:scale-105 hover:opacity-75 font-semibold">
          <Button className={cn(buttonVariants({ size: 'lg' }))}>
            Courses
          </Button>
        </li>
      </ul>
    </nav>
  )
}