export default function Hero(){
    return(
        <div className="flex w-full py-20 md:py-40">     
            <div>
                <h1 className="text-zinc-900 text-4xl md:text-6xl lg:text-9xl opacity-0 animate-[fadeUp_0.5s_ease-out_forwards]">
                    AI Reimagined.
                </h1>
                <p className="text-xl md:text-2xl text-accent opacity-0 animate-[fadeUp_0.7s_ease-out_forwards] [animation-delay:500ms]">
                    Agentic AI that is local-first, transparent, and designed for user control.
                </p>
            </div>
        </div>
    );
}