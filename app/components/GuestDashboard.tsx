"use client";

import { useState } from "react";
import { FormData } from "@/lib/types/form";
import { useApi } from "@/lib/hooks/useApi";
import { motion } from "framer-motion";
import { DataTable } from "@/app/components/DataTable";
import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";

export function GuestDashboard({ userName }: { userName: string }) {
  const { data: forms = [], loading } = useApi<FormData[]>('/api/forms');
  const [searchTerm, setSearchTerm] = useState("");

  const filteredForms = forms?.filter(form => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      form.name.toLowerCase().includes(searchLower) ||
      form.address.toLowerCase().includes(searchLower) ||
      form.pin.includes(searchTerm) ||
      form.phone.includes(searchTerm)
    );
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-10"
      >
        <h1 className="text-xl sm:text-4xl  font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          Welcome, {userName}!
        </h1>
        <p className="text-sm sm:text-xl text-gray-600 dark:text-gray-300">
          You have read-only access to view form data.
        </p>
      </motion.div>

      <div className="mb-6 sm:mb-8">
        <div className="relative mx-auto max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="search"
            placeholder="Search by name, address, PIN, or phone"
            className="pl-10 h-11 text-sm lg:text-base border border-gray-200 dark:border-gray-700"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="backdrop-blur-lg  p-4 sm:p-6 lg:p-8"
      >
        <DataTable
          data={filteredForms || []}
          isAdmin={false}
          loading={loading}
        />
      </motion.div>
    </div>
  );
}