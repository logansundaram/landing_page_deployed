interface AboutProps{
    header: string;
    body: string;
}


export default function About({header, body} : AboutProps){
    return (
        <div>
            <h1 className="text-blue-900 font-bold">
                {header}
            </h1>
            <p>
                {body}
            </p>
        </div>
    )
}