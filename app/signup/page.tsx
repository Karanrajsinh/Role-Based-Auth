"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-black dark:via-gray-800 dark:to-black relative overflow-hidden px-4 sm:px-6">

      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/login"
        redirectUrl="/role-selection"
        appearance={{
          elements: {
            card: "backdrop-blur-none shadow-none border-none",
            headerTitle: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-600",
            headerSubtitle: "text-base sm:text-lg text-gray-600 dark:text-gray-300",
            socialButtonsBlockButton: "border border-gray-200 dark:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/10 transition-colors",
            formButtonPrimary: "bg-gradient-to-r from-gray-900 to-gray-600 dark:from-dark-gray-800 dark:to-gray-400 hover:opacity-90 transition-opacity h-11",
            footerActionLink: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium",
            formFieldInput: "bg-white/60 dark:bg-gray-800/10 border border-gray-200 dark:border-gray-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
          },
        }}
      />
    </div>
  );
}