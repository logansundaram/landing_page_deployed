"use client";

import { useInView } from "react-intersection-observer";

export default function Reveal(){
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.4,
    });
    return (
        <div ref={ref} className="md:flex md:gap-2">
            <p className="text-5xl">
                In Development.
            </p>

            <p
                className={[
                "text-5xl text-blue-900",
                inView
                    ? "animate-[revealLeft_0.85s_cubic-bezier(0.25,0.8,0.25,1)_forwards]"
                    : "[clip-path:inset(0_90%_0_0)] opacity-90",
                ].join(" ")}
            >
                Summer 2026.
            </p>
        </div>
    )
}