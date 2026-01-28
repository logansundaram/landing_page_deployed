import About from "../components/about";
import Paragraph from "../components/paragraph";
import Step from "../components/step";
import Blurb from "../components/blurb";
import { about } from "../content/about";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">

        <div className="grid h-150 w-full justify-center items-center grid-cols-1 md:grid-cols-2">
          <div className="p-8 pt-25 md:p-12">
            <h1 className="text-4xl md:text-6xl lg:text-8xl text-blue-900">
              About 
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-8xl text-blue-900 animate-[revealLeft_1s_ease-out_forwards] [animation-delay:150ms] opacity-0">
              Saturday.ai
            </h1>
          </div>      
          <div className="p-4 md:p-8">
            <Paragraph header="Our Approach" framer="How we think about building AI applications" body="Agentic AI has advanced rapidly, but key limitations still prevent it from working reliably in real-world systems. Saturday.ai is building an AI agent that addresses these flaws, enabling seamless integration into existing workflows."/>
          </div>
        </div>

        <div className="md:p-12 p-8">
            <h1 className="text-3xl md:text-6xl">
              The Current Shortcomings of AI
            </h1>
            <p className="pb-4">
              What we seek to solve.
            </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:gap-6 md:p-6 pl-0 md:pl-0">
            <Step step="01" header="Opaque Behavior" body="Intermediate steps are often hidden from the user, making checking for hallucinations time consuming."/>
            <Step step="02" header="Limited Versatility" body="Agentic Applications built around a designated LLM or workflow face limited adaptiblity."/>
            <Step step="03" header="Cloud Dependence" body="Running LLM's in the cloud jeapordize data privacy, a major risk for data sensitive environments."/>
            <Step step="04" header="Hardware Constrained" body="Expensive dedicated enterprise GPU's power the world's AI, making for an expensive upfront cost or recurring API costs."/>
          </div>
        </div>

        <div className="pb-40 p-8 md:p-12">
            <h1 className="text-3xl md:text-6xl">
              Our Belief
            </h1>
            <p className="">
              Built for real-world systems.
            </p>

            <Blurb header="AI is not one size fits all." subheader="Everything we build is designed to prioritize user's needs and giving them control over Agentic AI."/>

        </div>

        <div className="pb-40 p-8 md:p-12">
            <h1 className="text-3xl md:text-6xl">
              The Team
            </h1>
            <p className="pb-4">
              Designed by engineers at Michigan and Berkeley.
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
