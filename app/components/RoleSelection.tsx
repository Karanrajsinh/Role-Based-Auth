"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { useRole } from "@/lib/hooks/useRole";
import { UserIcon, ShieldCheck } from "lucide-react";

export function RoleSelection() {
  const { loading, selectRole } = useRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
      >
        <Card className="h-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3">
              <UserIcon className="h-6 w-6 text-blue-500" />
              Guest Role
            </CardTitle>
            <CardDescription>
              Access data in read-only mode
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ul className="space-y-2 text-sm">
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
              className="w-full"
              variant="outline"
              disabled={loading}
              onClick={() => selectRole("GUEST")}
            >
              {loading ? "Selecting..." : "Select Guest Role"}
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
        <Card className="h-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-green-500" />
              Admin Role
            </CardTitle>
            <CardDescription>
              Full access to all data and operations
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ul className="space-y-2 text-sm">
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
              className="w-full"
              disabled={loading}
              onClick={() => selectRole("ADMIN")}
            >
              {loading ? "Selecting..." : "Select Admin Role"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}