interface PointProps{
    header: string;
    body:string;
}


export default function Point({header, body} : PointProps){
    return(
        <div>
            <h1 className="text-xl md:text-4xl">
                {header}
            </h1>
        </div>
    )

}