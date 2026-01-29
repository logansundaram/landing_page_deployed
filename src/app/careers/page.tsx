import Link from "next/link";

export default function Home() {
  return (
    <div className="base">
        <div className="p-10">

        </div>
        <div className="flex justify-center md:p-40 p-20">
            <h1 className="md:text-6xl text-4xl text-blue-900">
                Careers
            </h1>
        </div>

        <div className="p-8 md:p-12 text-2xl">
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
