interface BlurbProps{
    header:string;
    subheader:string;
    body:string
}

export default function Blurb({header, subheader, body} : BlurbProps){
    return (
        <div>
            <h1 className="">
                {header}
            </h1>

        </div>
    )
}