interface ParagraphProps {
    header: string;
    framer: string;
    body: string;
}

export default function Paragraph({header, framer, body}:ParagraphProps){
    return (
        <div className="rounded-md justify-center">
          <div className="font-xl pb-2">
            <h1 className="font-bold">
              {header}
            </h1>
            <p className="text-blue-900">
              {framer}
            </p>
          </div>
          <p>
            {body}
          </p>
        </div>
    )
}