"use client";

import { useState, useEffect } from "react";
import { FormData } from "@/lib/types/form";
import { useApi } from "@/lib/hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";
import { AdminFormEditor } from "@/app/components/AdminFormEditor";
import { DataTable } from "@/app/components/DataTable";
import { PlusCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useFormSubmission } from "@/lib/hooks/useFormSubmission";

export function AdminDashboard({ userName }: { userName: string }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<FormData | null>(null);
  const { data: forms = [], loading, refetch } = useApi<FormData[]>('/api/forms');
  const { deleteForm } = useFormSubmission();

  const handleEditForm = (form: FormData) => {
    setEditingForm(form);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingForm(null);
  };

  const handleFormCreated = async () => {
    await refetch();
    handleCloseForm();
  };

  const handleDeleteForm = async (id: string) => {
    const success = await deleteForm(id);
    if (success) {
      await refetch();
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-10 max-w-7xl">
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
          As an admin, you have full access to manage forms.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white">Form Management</h2>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 hover:opacity-90 transition-opacity  px-6"
        >
          <PlusCircle size={20} />
          <span className="text-base">Add New Form</span>
        </Button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-500/40 rounded-xl border border-white/30 dark:border-gray-700/40 shadow-xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                {editingForm ? "Edit Form" : "Create New Form"}
              </h3>
              <AdminFormEditor
                initialData={editingForm}
                onCancel={handleCloseForm}
                onSuccess={handleFormCreated}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="backdrop-blur-lg  border-white/30  p-4 sm:p-6 lg:p-8"
      >
        <DataTable
          data={forms || []}
          isAdmin={true}
          loading={loading}
          onEdit={handleEditForm}
          onDelete={handleDeleteForm}
        />
      </motion.div>
    </div>
  );
}