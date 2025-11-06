"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import api from "@/src/app/lib/axios"; // ✅ axios instance import
import { loginSuccess, checkAuth } from "@/src/features/auth/authSlice";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccessMsg("");

    try {
      const res = await api.post("/api/auth/register", form); // ✅ baseURL already set

      dispatch(loginSuccess(res.data));
      await dispatch(checkAuth());

      setSuccessMsg("🎉 Registration successful! Redirecting...");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      setErr(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/hero.png')` }}
    >
      <div className="bg-white/30 backdrop-blur-lg p-10 rounded-2xl w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          🆕 Register
        </h2>
        {err && <p className="text-red-400 text-sm mb-4 text-center">{err}</p>}
        {successMsg && (
          <p className="text-green-400 text-sm mb-4 text-center">
            {successMsg}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-white/80 text-black focus:outline-none focus:ring focus:ring-yellow-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-white/80 text-black focus:outline-none focus:ring focus:ring-yellow-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-white/80 text-black focus:outline-none focus:ring focus:ring-yellow-400"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-md hover:bg-yellow-500 transition disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-white text-sm mt-5 text-center">
          Already have an account?{" "}
          <a href="/login" className="underline hover:text-yellow-400">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
