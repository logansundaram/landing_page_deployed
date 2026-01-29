import Paragraph from "./components/paragraph";
import Step from "./components/step";
import Reveal from "./components/reveal";
import Signup from "./components/signup";
import Hero from "./components/hero";
import Blurb from "./components/blurb";
import { features } from "./content/features";
import { workflow } from "./content/workflow";


export default function Home() {
  return (
    <div className = "base">
      <Hero/>  

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {features.map((feature) => (
          <Paragraph key={feature.id} header={feature.title} framer={feature.subtitle} body={feature.description}/>
        ))}
      </div>



      <Blurb header="An extensible AI agent." subheader="Swap in custom models, workflows, and tools on an already robust foundation."/>






      

      <div className="p-10 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <div className="flex items-center h-full">
          <div className="pb-6">
            <h1 className="w-full text-4xl md:text-6xl text-blue-900">
              How Saturday.ai works
            </h1>
            <p>
              Explicit structure at every stage of the process.
            </p>
          </div>
        </div>

        <div className="grid grid-rows-4 gap-y-4 justify-center">
          {workflow.map((step) => (
            <Step key={step.id} step={step.step} header={step.title} body={step.description} />
          ))}
        </div>
      </div>

      

      <div className="flex w-full h-100 md:h-125 justify-center items-center">
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
