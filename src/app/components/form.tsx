interface FormProps{
    placeholder : string;
};


export default function Form({placeholder} : FormProps){
    return (
        <form action="/submit-page" method="POST" className="p-8 md:p-12 z-80 focus:ring-2">
              <input type="text" placeholder={placeholder}/>
        </form>
    )
}