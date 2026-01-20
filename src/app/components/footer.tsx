import Link from "next/link"

export default function Footer(){
    return (
        <footer className="flex text-xs justify-center w-full p-8 gap-16 bg-zinc-50">
          <div>
            <Link href="/contact">
                Contact
            </Link>
            <p>
              Email: saturday.ai.team@gmail.com
            </p>
          </div>

          <div>
            <Link href="/about">
                About
            </Link>
            <p>
              Saturday.ai
            </p>
          </div>

           <div>
            <h1>
              © 2026 Saturday AI
            </h1>
            <p>
              All rights reserved
            </p>
          </div>

        </footer>
    )
}