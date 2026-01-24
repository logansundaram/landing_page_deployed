"use client";
import React, { useState } from "react";
import client from "../lib/client";

interface FormProps {
  placeholder: string;
}

export default function Form({ placeholder }: FormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    setErrorMsg("");

    const payload = {
      email: email.trim().toLowerCase() || null,
      name: name.trim() || null,
      message: message.trim(),
    };

    if (!payload.message) {
      setStatus("error");
      setErrorMsg("Please enter a message.");
      return;
    }

    const { error } = await client.from("messages").insert([payload]);

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }

    setEmail("");
    setName("");
    setMessage("");
    setStatus("success");
  }

  return (
    <div className="">
      <form onSubmit={onSubmit} className="p-8 md:p-12 w-fit">
        <div className="grid grid-rows-2 gap-8">
          <div className="gap-4 flex bg-zinc-50">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border-b-2 border-zinc-900 outline-none bg-zinc-50 focus:border-blue-900"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border-b-2 border-zinc-900 outline-none focus:border-blue-900 bg-zinc-50"
            />
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="border-b-2 h-10 border-zinc-900 outline-none focus:border-blue-900 bg-zinc-50"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-3 py-1 hover:bg-blue-900 text-zinc-50 bg-zinc-900 focus:text-zinc-50 "
        >
          Submit
        </button>

        {status === "success" && <p className="mt-2 text-sm">Sent</p>}
        {status === "error" && <p className="mt-2 text-sm">{errorMsg}</p>}
      </form>
    </div>
  );
}
