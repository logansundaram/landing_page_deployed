import Link from "next/link"

export default function Navbar(){
    return (
        <header className="text-lg flex w-full h-20 place-content-between fixed z-50">
          <div className="">
            <Link href="/" className="flex md:p-8 p-6 link">
                Saturday.ai
            </Link>
          </div>
            <div className="md:gap-8 gap-6 flex md:p-8 p-6">
              <Link href="/about" className="link">
                About
              </Link>
              <Link href="/contact" className="link">
                Contact
              </Link>
              <Link href="/careers" className="link">
                Careers
              </Link>
              <Link href="/install" className="link">
                Install
              </Link>
            </div>
        </header>
    )
}