
export default function Home() {
  return (
    <div className = "bg-zinc-50 font-sans dark:bg-black">

      <div className="flex w-full justify-center items-center p-12 pt-40 pb-20">      
        <div>
          <h1 className="text-9xl opacity-0 text-blue-900 animate-[fadeUp_0.5s_ease-out_forwards]">
            Transparent AI Democratized.
          </h1>
          <p className="opacity-0 animate-[fadeUp_0.7s_ease-out_forwards] [animation-delay:500ms]">
            AI designed for transparency, robustness, and flexibility.            
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 p-8">
        <div className="rounded-md justify-center p-4">
          <div className="font-xl pb-2">
            <h1 className="font-bold">
              Local-First by Design
            </h1>
            <p className="text-blue-900">
              Your AI runs where your data lives.
            </p>
          </div>
          <p>
            Saturday.ai is built to operate locally by default. Models, workflows, and knowledge stay on your machine—giving you direct control over privacy, performance, and persistence. There is no forced cloud dependency, no hidden data movement, and no unnecessary latency. When connectivity is optional, reliability becomes a feature rather than a risk.
          </p>
        </div>
        <div className="rounded-md justify-center p-4">
          <div className="font-xl pb-2">
            <h1 className="font-bold">
              Agentic Workflows, Not Black Boxes
            </h1>
            <p className="text-blue-900">
              Built from explicit steps you can inspect and reason about.
            </p>
          </div>
          <p>
            Instead of relying on a single opaque agent, Saturday.ai is structured around agentic workflows composed of clear, traceable steps. Each decision, tool invocation, and state transition is explicit—making behavior understandable, debuggable, and reproducible. This architecture favors correctness and trust over unpredictability, especially as systems grow in complexity.
          </p>
        </div>
        <div className="rounded-md justify-center p-4">
          <div className="font-xl pb-2">
            <h1 className="font-bold">
              Self-Improving Capabilites
            </h1>
            <p className="text-blue-900">
              AI systems that can refine their own workflows.
            </p>
          </div>
          <p>
            Saturday.ai treats tools and workflows as first-class components. Agents can compose, evaluate, and iterate on agentic workflows built from reusable, policy-constrained building blocks. Instead of hard-coded pipelines or opaque behavior, tasks compile into explicit LangGraph workflows with defined state, tool policies, and verification steps—allowing systems to adapt and improve while remaining inspectable, reproducible, and under control.
          </p>
        </div>
      </div>

      <div className="p-24 grid grid-cols-2 gap-x-12 ">
        <div className="flex items-center h-full">
          <div>
            <h1 className="w-full text-6xl text-blue-900">
              How Saturday.ai works
            </h1>
            <p>
              Explicit structure at every stage of the process.
            </p>
          </div>
        </div>

        <div className="grid grid-rows-4 gap-y-4 justify-center">

          <div className="flex gap-2">
            <p className="font-bold">
              01
            </p>
            <div>
              <p className="">
                Compile the task
              </p>
              <p>
                Intent becomes an explicit workflow.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <p className="font-bold">
              02
            </p>
            <div>
              <p className="">
                Execute locally
              </p>
              <p>
                Computation runs where your data lives.
              </p>
            </div>
          </div>


          <div className="flex gap-2">
            <p className="font-bold">
              03
            </p>
            <div>
              <p className="">
                Inspect and verify
              </p>
              <p>
                Every decision is visible.
              </p>
            </div>
          </div>


          <div className="flex gap-2">
            <p className="font-bold">
              04
            </p>
            <div>
              <p className="">
                Improve the workflow
              </p>
              <p>
                Systems evolve without losing control.
              </p>
            </div>
          </div>

        </div>
      </div>

      

      <div className="w-full h-125 justify-center flex items-center">
        <div>
          <div className="flex gap-2">
            <p className="text-5xl">
              Coming Soon.    
            </p>
            <p className="text-5xl text-blue-900 animate-[revealLeft_1.2s_ease-out_forwards] [animation-delay:2s] opacity-0">
              Summer 2026.
            </p>
          </div>
          <p>
            Sign up for updates.
          </p>
        </div>
      </div>

        
      
    </div>
  );
}
