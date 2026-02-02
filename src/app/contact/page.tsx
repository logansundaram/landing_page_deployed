import Threads from '../components/threads'
import Form from '../components/form'


export default function Home() {
    return (
        <div className="base overflow-x-hidden relative">
            <div className="w-full h-full flex items-center absolute pointer-events-none mask-l-from-40% mask-l-to-70%">
                <Threads 
                    amplitude={1.5}
                    color={[0.118, 0.227, 0.541]}
                    enableMouseInteraction={false}
                />
            </div>

            <div className="w-full pt-18">      
                <h1 className="text-4xl md:pt-10 md:text-6xl lg:text-9xl text-blue-900">
                    Contact
                </h1>
                <p>
                    For questions, collaboration, or early conversations.
                </p>
            </div>

            <div className="w-auto">
                <Form />
            </div>
        </div>
    )
}