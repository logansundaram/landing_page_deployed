interface BlurbProps{
    header:string;
    subheader:string;
}

export default function Blurb({header, subheader} : BlurbProps){
    return (
        <div className="p-12 py-20 md:py-40 align-middle">
                <h1 className="text-2xl md:text-6xl lg:text-6xl text-center">
                    {header}
                </h1>
                <p className="text-blue-900 text-center lg:text-4xl text-xl md:text-2xl">
                    {subheader}
                </p>
        </div>
    )
}