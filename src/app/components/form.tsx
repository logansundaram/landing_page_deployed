"use client";
import React, { useState } from "react";
import client from "../lib/client";

export default function Form() {
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
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-lg pt-8 md:pt-12"
      >
        <div className="grid gap-8">
          <div className="flex flex-col sm:flex-row gap-4 bg-zinc-50">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full sm:flex-1 min-w-0 border-b-2 border-zinc-900 outline-none bg-zinc-50 focus:border-blue-900"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full sm:flex-1 min-w-0 border-b-2 border-zinc-900 outline-none focus:border-blue-900 bg-zinc-50"
            />
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send us a message"
            className="w-full min-w-0 border-b-2 h-10 border-zinc-900 outline-none focus:border-blue-900 bg-zinc-50"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-3 py-1 hover:bg-blue-900 text-zinc-50 bg-zinc-900 focus:text-zinc-50"
        >
          Submit
        </button>

        {status === "success" && <p className="mt-2 text-sm">Sent</p>}
        {status === "error" && <p className="mt-2 text-sm">{errorMsg}</p>}
      </form>
    </div>
  );
}
