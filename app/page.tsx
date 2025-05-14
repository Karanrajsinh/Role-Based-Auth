'use client';

import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ModeToggle } from "./components/ModeToggle";

export default function Home() {



  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-black dark:via-gray-800 dark:to-black overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl"
        initial={{ x: -200, y: -200, opacity: 0 }}
        animate={{ x: -100, y: -100, opacity: 0.5 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl"
        initial={{ x: 200, y: 200, opacity: 0 }}
        animate={{ x: 100, y: 100, opacity: 0.5 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1.5 }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative">
        <header className="flex justify-between items-center py-6">
          <motion.h1
            className="text-lg lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Role-Based Auth App
          </motion.h1>
          <div className=" flex items-center gap-4">
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        <main className="flex justify-center items-center min-h-[calc(80vh-80px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <h2 className="text-xl sm:text-4xl text-center font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Welcome to Role-Based Auth
            </h2>
            <p className="text-sm lg:text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
              A secure application with role-based access control for different user types. Manage access levels and permissions with confidence.
            </p>

            <div className="flex mx-auto justify-center items-center gap-4">
              <Link href="/role-selection">
                <Button
                  className="h-11 px-6 bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="h-11 px-6"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}