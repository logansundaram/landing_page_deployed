import Blurb from "../components/blurb";
import Link from "next/link";

export default function Home() {
  return (
    <div className="base">
        <div className="py-20">
            <h1 className="text-3xl md:text-6xl">
                Careers
            </h1>
            <p className="">
                Traits we look for in new hires
            </p>
            <Blurb header="Those who build real systems, not just prototypes." subheader="Saturday.ai is designed for end-to-end deployment: explicit workflows, local execution, and architectures that hold up under real constraints."/>
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
