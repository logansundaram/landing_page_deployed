import Threads from '../components/threads'
import Form from '../components/form'


export default function Home() {
    return (
        <div className="min-h-screen font-sans">

                <div className="w-full h-200 flex items-center absolute pointer-events-none mask-l-from-40% mask-l-to-70%">
                    <Threads 
                        amplitude={2}
                        color={[0.118, 0.227, 0.541]}
                        enableMouseInteraction={true}
                    />
                </div>

                <div className="md:pl-12 md:pt-12 p-8 w-full">      
                    <h1 className="text-4xl md:pt-10 md:text-6xl lg:text-9xl text-blue-900 text-left z-4">
                        Contact
                    </h1>
                    <p>
                        For questions, collaboration, or early conversations.
                    </p>
                </div>


                <Form placeholder="Send us a message"/>
        </div>
    )
}