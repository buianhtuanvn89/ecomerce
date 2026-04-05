"use client";

import { useRouter } from "next/navigation";

export default function ChangePasswordSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
   

        <h2 className="text-2xl font-bold mb-2">
          Password Changed Successfully
        </h2>

        <p className="text-gray-600 mb-6">
          Your password has been updated. Please use your new password next time you log in.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}