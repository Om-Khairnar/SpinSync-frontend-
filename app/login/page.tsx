"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"admin" | "user">("user");
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
    fullname: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = showRegister
        ? `${process.env.NEXT_PUBLIC_API_URL}/${activeTab === "admin" ? "admin" : "users"}/register`
        : `${process.env.NEXT_PUBLIC_API_URL}/${activeTab === "admin" ? "admin" : "users"}/login`;

      const response = await fetch(endpoint!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(showRegister ? {
          fullname: formData.fullname,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        } : {
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!result.success || !response.ok) {
        throw new Error(result.message || (showRegister ? "Registration failed" : "Login failed"));
      }

      if (showRegister) {
        // Show success message and switch to login
        alert(`${activeTab === "admin" ? "Admin" : "User"} registered successfully! Please login.`);
        setShowRegister(false);
        setFormData({
          email: "",
          mobile: "",
          password: "",
          fullname: "",
        });
        return;
      }

      // Store tokens and user data in localStorage
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);
      localStorage.setItem("userData", JSON.stringify(
        activeTab === "admin" ? result.data.admin : result.data.user
      ));
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {showRegister ? `${activeTab === "admin" ? "Admin" : "User"} Registration` : "SpinSync Login"}
        </h2>

        {/* Show Login/Register Tabs */}
        {(
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 rounded-t-lg ${
                activeTab === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("user")}
            >
              User Login
            </button>
            <button
              className={`flex-1 py-2 rounded-t-lg ${
                activeTab === "admin"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("admin")}
            >
              Admin Login
            </button>
          </div>
        )}

        {/* Login Form OR Register Form */}
        {!showRegister ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium mb-2">
                Mobile Number
              </label>
              <Input
                type="text"
                id="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              disabled={loading}
            >
              {activeTab === "admin" ? "Admin Login" : "User Login"}
            </Button>

            {/* Register Link */}
            <p className="text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <Input
                type="text"
                id="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium mb-2">
                Mobile No.
              </label>
              <Input
                type="text"
                id="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter your password"
              />
            </div>
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              disabled={loading}
            >
              {activeTab === "admin" ? "Register as Admin" : "Register as User"}
            </Button>

            {/* Back to Login */}
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setShowRegister(false)}
              >
                Back to Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
