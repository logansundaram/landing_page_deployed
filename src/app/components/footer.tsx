import Link from "next/link"

export default function Footer(){
    return (
        <footer className="flex text-xs justify-center w-full p-4 md:p-8 gap-4 md:gap-16 bg-zinc-50 ">
          <div>
            <Link href="/contact">
                Contact
            </Link>
          </div>

          <div>
            <Link href="/about">
                About
            </Link>
          </div>

           <div>
            <h1>
              ©2026 Saturday AI
            </h1>
            
          </div>

          <h1>
              All rights reserved
          </h1>
        </footer>
    )
}