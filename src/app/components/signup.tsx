"use client";

import React, { useState } from "react";
import client from "../lib/client";

export default function Signup() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        const trimmed = email.trim().toLowerCase();
        if (!trimmed) {
          setStatus("error");
          setErrorMsg("Please enter an email.");
          return;
        }
        const EMAIL_RE = /^(?!\.)(?!.*\.\.)[A-Z0-9._%+-]{1,64}(?<!\.)@[A-Z0-9-]{1,63}(?:\.[A-Z0-9-]{1,63})*\.[A-Z]{2,63}$/i;

        if (!EMAIL_RE.test(trimmed)){
          setStatus("error");
          setErrorMsg("Invalid email.");
          return;
        }
        
        const { error } = await client.from("waitlist").insert([{ email: trimmed }]);

        if (error) {
          // dup email
          if (error.code === "23505") {
            setStatus("success");
            setEmail("");
            return;
          }
          setStatus("error");
          setErrorMsg(error.message);
          return;
        }

        setStatus("success");
        setEmail("");
    }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-zinc-50 p-2 bg-zinc-900 hover:bg-blue-900"
      >
        Sign up for updates.
      </button>

      <div className="h-12 mt-2">
        <form
          onSubmit={onSubmit}
          className={`transition-opacity duration-300
            ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 h-10 w-64 border-zinc-900 outline-none focus:border-blue-900"
          />
        </form>
      </div>
    </div>
    );
}
