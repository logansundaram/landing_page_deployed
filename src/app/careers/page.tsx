import Link from "next/link";

export default function Home() {
  return (
    <div className="base">
        <div className="flex md:py-40 py-20">
            <h1 className="md:text-6xl text-4xl text-zinc-900">
                Careers
            </h1>
        </div>

       

        <div className="text-2xl">
            <p>
                We are not actively hiring yet.
            </p>
            <p className="pb-2">
                If you’re interested in what we’re building, reach out.
            </p>
            <Link href="contact" className="p-1 bg-zinc-900 text-zinc-50">
                Contact
            </Link>
        </div>
    </div>
  );
}
