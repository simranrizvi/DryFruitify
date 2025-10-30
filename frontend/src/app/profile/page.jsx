"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // ✅ Setup Axios instance with credentials enabled
  const api = axios.create({
    baseURL: "http://localhost:5000/api", // backend ka base url
    withCredentials: true, // 👈 important for JWT cookie
  });

  // Profile fetch
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        console.error("Profile fetch error:", err.response?.data || err.message);
        setMsg("⚠ Please login to view your profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/users/me", { name, email, password });
      setMsg("✅ Profile updated successfully!");
      setUser(res.data.user);
      setPassword("");
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err.message);
      setMsg("❌ Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">👤 Profile</h2>

        {msg && <p className="text-center mb-4">{msg}</p>}

        {user ? (
          <form onSubmit={handleUpdate} className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="New Password (optional)"
              className="w-full px-4 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Update Profile
            </button>
          </form>
        ) : (
          <p className="text-center">⚠ Please login to access profile.</p>
        )}
      </div>
    </div>
  );
}
