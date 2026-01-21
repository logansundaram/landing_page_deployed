import About from "../components/about";
import { about } from "../content/about";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">

        <div className="grid h-150 w-full justify-center items-center grid-cols-1 md:grid-cols-2">
          <div className="p-8 pt-25 md:p-12">
            <h1 className="text-4xl md:text-6xl lg:text-9xl text-blue-900">
              About 
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-9xl text-blue-900 animate-[revealLeft_1s_ease-out_forwards] [animation-delay:150ms] opacity-0">
              Saturday.ai
            </h1>
          </div>      
          <div className="p-8">
            <div className="pb-2">
              <h1 className="font-bold text-l">
                Our Approach
              </h1>
              <p className="text-blue-900">
                How we think about building AI applications
              </p>
            </div>
            <p className="pb-2">
              We’re building AI systems that are understandable, auditable, and designed to work with you—not around you. In a world where AI is increasingly opaque and centralized, we believe powerful intelligence should be traceable, controllable, and locally deployable.
            </p>
            <p>
              Our work focuses on creating modular AI workflows that users can inspect, customize, and trust, whether they’re running on a laptop, workstation, or private infrastructure.
            </p>
          </div>
        </div>


        <div className="pb-40 p-8 md:p-12">
            <h1 className="text-6xl">
              The Team
            </h1>
            <p className="pb-4">
              Built by engineers at Michigan and Berkeley
            </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {about.map((section) => (
                <About
                  key={section.id}
                  header={section.title}
                  body={section.body}
                />
              ))}
          </div>
        </div>
      </div>
  );
}
