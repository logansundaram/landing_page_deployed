import Threads from '../components/threads'


export default function Home() {
    return (
        <div className="min-h-screen font-sans bg-zinc-50">
            <main>

                <div className="w-full h-200 flex items-center absolute bg-transparent">
                    <Threads
                        amplitude={2}
                        color={[0.118, 0.227, 0.541]}
                        enableMouseInteraction={true}
                    />
                </div>

                <div className="md:h-94 pt-20 md:p-12 p-8 w-full">      
                    <h1 className="text-4xl md:text-6xl lg:text-9xl text-blue-900 text-left">
                        Contact
                    </h1>
                    <p>
                        For questions, collaboration, or early conversations.
                    </p>
                </div>

                <h1 className="pl-8">
                    saturday.ai.team@gmail.com
                </h1>

            </main>
        </div>
    )
}