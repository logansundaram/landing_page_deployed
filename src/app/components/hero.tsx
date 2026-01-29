export default function Hero(){
    return(
        <div className="flex w-full pt-20 pb-10 md:pb-40">      
            <div>
                <h1 className="text-4xl md:text-6xl lg:text-9xl opacity-0 text-blue-900 animate-[fadeUp_0.5s_ease-out_forwards]">
                    AI Reimagined.
                </h1>
                <p className="text-xl opacity-0 animate-[fadeUp_0.7s_ease-out_forwards] [animation-delay:500ms]">
                    Agentic AI that is local-first, transparent, and designed for user control.
                </p>
            </div>
        </div>
    );
}