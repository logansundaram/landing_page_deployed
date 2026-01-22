"use client";

import React, { useState } from "react";

export default function Signup() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("submitted:", email);
        setEmail("");
    }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="hover:text-blue-900"
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
