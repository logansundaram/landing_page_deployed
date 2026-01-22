"use client";

interface FormProps{
  placeholder : string;
};

export default function Form({placeholder} : FormProps){

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ⬅️ stops page refresh

    // handle your submit logic here
    // fetch("/api/contact", { ... })
    }

    return (
        <div className="">
            <form action="" method="POST" onSubmit={onSubmit} className="p-8 md:p-12 w-fit">
            <div className="grid grid-rows-2 gap-8">
                <div className="gap-4 flex">
                <input
                    type="text"
                    placeholder="Email"
                    className="border-b-2 border-zinc-900 outline-none focus:border-blue-900"
                />
                <input
                    type="text"
                    placeholder="Name"
                    className="border-b-2 border-zinc-900 outline-none focus:border-blue-900"
                />
                </div>

                <input
                    type="text"
                    placeholder={placeholder}
                    className="border-b-2 h border-zinc-900 outline-none focus:border-blue-900"
                />
            </div>
            <button type="submit" className="mt-4 hover:bg-blue-900 hover:text-zinc-50 focus:bg-zinc-900 focus:text-zinc-50">Submit</button>
            </form>
        </div>
    )
}
