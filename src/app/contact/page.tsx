import Threads from '../components/threads'


export default function Home() {
    return (
        <div className="min-h-screen font-sans dark:bg-black bg-zinc-50">
            <main>

                <div className="w-full h-200 flex items-center absolute bg-transparent">
                    <Threads
                        amplitude={2}
                        color={[0.118, 0.227, 0.541]}
                        enableMouseInteraction={true}
                    />
                </div>

                <div className="h-94 pt-20 p-8 pt w-full">      
                    <h1 className="text-9xl text-blue-900 text-left">
                        Contact
                    </h1>
                    <p>
                        For questions, collaboration, or early conversations.
                    </p>
                </div>

                <h1 className="pl-8">
                     saturday_ai@gmail.com
                </h1>

            </main>
        </div>
    )
}