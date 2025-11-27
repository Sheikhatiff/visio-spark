import React from "react";
import { Link } from "react-router-dom";

export default function AuthLanding() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/90 shadow-2xl border border-slate-800 p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-white">Welcome 👋</h1>
          <p className="text-sm text-slate-400">
            Sign in to continue, or create a new account using email or social
            login.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/sign-in"
            className="w-full inline-flex justify-center items-center rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Login / Sign in
          </Link>

          <Link
            to="/sign-up"
            className="w-full inline-flex justify-center items-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 transition"
          >
            Create new account
          </Link>
        </div>
      </div>
    </div>
  );
}
