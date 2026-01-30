import Paragraph from "./components/paragraph";
import Step from "./components/step";
import Reveal from "./components/reveal";
import Signup from "./components/signup";
import Hero from "./components/hero";
import Blurb from "./components/blurb";
import Link from "next/link";
import { features } from "./content/features";
import { workflow } from "./content/workflow";


export default function Home() {
  return (
    <div className = "base">
      <Hero/>  

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 py-20">
        {features.map((feature) => (
          <Paragraph key={feature.id} header={feature.title} framer={feature.subtitle} body={feature.description}/>
        ))}
        <Link href="/about" className="bg-zinc-900 text-light w-fit p-2">
          Find out what we stand for
        </Link>
      </div>



      <Blurb header="An extensible AI agent." subheader="Swap in custom models, workflows, and tools on an already robust foundation."/>






      

      <div className="grid grid-rows-1 md:grid-rows-2 gap-x-12 py-20">
        <div className="flex items-center h-full">
          <div className="pb-6">
            <h1 className="w-full text-4xl md:text-6xl">
              How Saturday.ai works
            </h1>
            <p className="text-blue-900">
              Explicit structure at every stage of the process.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-y-4 justify-center">
          {workflow.map((step) => (
            <Step key={step.id} step={step.step} header={step.title} body={step.description} />
          ))}
        </div>
      </div>

      

      <div className="flex w-full py-30 md:py-60 justify-center items-center">
        <div className="">
          <div className="pb-2">
            <Reveal/>
          </div>
          <Signup/>
        </div>
      </div>

        
      
    </div>
  );
}
