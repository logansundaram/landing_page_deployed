import Paragraph from "./components/paragraph";
import Step from "./components/step";
import { features } from "./content/features";
import { workflow } from "./content/workflow";


export default function Home() {
  return (
    <div className = "bg-zinc-50 font-sans">

      <div className="flex w-full p-8 pt-26 pb-10 md:p-12 md:pt-40 md:pb-20">      
        <div>
          <h1 className="text-4xl md:text-6xl lg:text-9xl opacity-0 text-blue-900 animate-[fadeUp_0.5s_ease-out_forwards]">
            Transparent AI Democratized.
          </h1>
          <p className="opacity-0 animate-[fadeUp_0.7s_ease-out_forwards] [animation-delay:500ms]">
            AI designed for transparency, robustness, and flexibility.            
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 p-4 md:p-8 lg:grid-cols-3">
        {features.map((feature) => (
          <Paragraph key={feature.id} header={feature.title} framer={feature.subtitle} body={feature.description}/>
        ))}
      </div>

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

      

      <div className="w-full h-100 md:h-125 justify-center flex items-center">
        <div>
          <div className="md:flex md:gap-2">
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
