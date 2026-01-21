interface StepProps{
    step: string;
    header: string;
    body: string;
}


export default function Step({step, header, body} : StepProps){
    return (
        <div className="flex gap-2">
            <p className="font-bold">
              {step}
            </p>
            <div>
              <p className="text-blue-900">
                {header}
              </p>
              <p>
                {body}
              </p>
            </div>
        </div>
    )
}