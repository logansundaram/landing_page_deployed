import Link from "next/link"

export default function Navbar(){
    return (
        <header className="flex w-full h-20 place-content-between fixed z-50">
          <div>
            <Link href="/" className="flex p-8 link">
                Saturday.ai
            </Link>
          </div>
            <div className="gap-5 flex p-8">
              <Link href="/about" className="link">
                About
              </Link>
              <h1>
              <Link href="/contact" className="link">
                Contact
              </Link>
              </h1>
            </div>
        </header>
    )
}