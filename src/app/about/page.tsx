export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main>

        <div className="grid h-150 w-full justify-center items-center grid-cols-2">
          <div className="p-8">
            <h1 className="text-9xl text-blue-900">
              About 
            </h1>
            <h1 className="text-9xl text-blue-900 animate-[revealLeft_1s_ease-out_forwards] [animation-delay:150ms] opacity-0">
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


        <div className="pb-40">
          <div className="p-8">
            <h1 className="text-6xl">
              The Team
            </h1>
            <p className="">
              Built by engineers at Michigan and Berkeley
            </p>
          </div>
          <div className="grid grid-cols-3 p-8 gap-x-8">
              <div>
                <h1 className="text-blue-900 font-bold">
                  Founding Engineers
                </h1>
                <p>
                  A small team from Berkeley and Michigan focused on building transparent, local-first AI systems. Founded by Logan Sundaram, Saturday.ai grew from a desire to apply AI in domains where privacy, robustness, and accountability are critical.
                </p>
              </div>

              <div>
                <h1 className="text-blue-900 font-bold">
                  Research & Systems Design
                </h1>
                <p>
                  Experience across systems design, agentic workflows, and applied machine learning, informed by academic research and real-world constraints.
                </p>

              </div>

              <div>
                <h1 className="text-blue-900 font-bold">
                  Early-Stage Exploration 
                </h1>
                <p>
                  Actively exploring how explicit structure and evaluation can make AI systems more reliable, understandable, and versatile over time.
                </p>

              </div>
          </div>

        </div>
      
      </main>
    </div>
  );
}
