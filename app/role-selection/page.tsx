"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { useRole } from "@/lib/hooks/useRole";
import { getUserRole } from "@/lib/clerk";
import { Role } from "@/lib/types/user";
import { UserButton } from "@clerk/nextjs";
import { UserIcon, ShieldCheck } from "lucide-react";
import { ModeToggle } from "../components/ModeToggle";

export default function RoleSelectionPage() {
  const { loading, selectRole } = useRole();
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await getUserRole();
        setUserRole(role);

        // If role is already set, redirect to dashboard
        if (role === "ADMIN") {
          router.push("/dashboard/admin");
        } else if (role === "GUEST") {
          router.push("/dashboard/guest");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchUserRole();
  }, [router]);

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-black dark:via-gray-800 dark:to-black relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-purple-200/40 dark:bg-purple-900/30 rounded-full blur-3xl"
        initial={{ x: -100, y: -100, opacity: 0 }}
        animate={{ x: -50, y: -50, opacity: 0.6 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute right-0 bottom-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-blue-200/40 dark:bg-blue-900/30 rounded-full blur-3xl"
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 50, y: 50, opacity: 0.6 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <header className="flex justify-between items-center py-6 sm:py-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          >
            Role Selection
          </motion.h1>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        <main className="flex items-center justify-center py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="h-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-white/30 dark:border-gray-700/40">
                <CardHeader className="pb-4 space-y-2">
                  <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                    <UserIcon className="h-6 w-6 text-blue-500" />
                    Guest Role
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                    Access data in read-only mode
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <ul className="space-y-3 text-sm sm:text-base">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> View all records
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Search and filter data
                    </li>
                    <li className="flex items-center text-gray-500">
                      <span className="mr-2">✗</span> Create new records
                    </li>
                    <li className="flex items-center text-gray-500">
                      <span className="mr-2">✗</span> Edit existing records
                    </li>
                    <li className="flex items-center text-gray-500">
                      <span className="mr-2">✗</span> Delete records
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full h-11 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    variant="outline"
                    disabled={loading}
                    onClick={() => selectRole("GUEST")}
                  >
                    <span className="text-base">{loading ? "Selecting..." : "Select Guest Role"}</span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="h-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-white/30 dark:border-gray-700/40">
                <CardHeader className="pb-4 space-y-2">
                  <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                    <ShieldCheck className="h-6 w-6 text-green-500" />
                    Admin Role
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                    Full access to all data and operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <ul className="space-y-3 text-sm sm:text-base">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> View all records
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Search and filter data
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Create new records
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Edit existing records
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Delete records
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full h-11 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 hover:opacity-90"
                    disabled={loading}
                    onClick={() => selectRole("ADMIN")}
                  >
                    <span className="text-base">{loading ? "Selecting..." : "Select Admin Role"}</span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}