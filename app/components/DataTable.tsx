"use client";

import { useState } from "react";
import { FormData } from "@/lib/types/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Button } from "@/app/components/ui/button";
import { Edit2, Trash2, AlertCircle, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";

interface DataTableProps {
  data: FormData[];
  isAdmin: boolean;
  loading: boolean;
  onEdit?: (form: FormData) => void;
  onDelete?: (id: string) => void;
}

type SortField = "name" | "address" | "pin" | "phone";
type SortDirection = "asc" | "desc";

export function DataTable({ data, isAdmin, loading, onEdit, onDelete }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const valueA = a[sortField].toLowerCase();
    const valueB = b[sortField].toLowerCase();
    const direction = sortDirection === "asc" ? 1 : -1;

    return valueA > valueB ? direction : -direction;
  });

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId && onDelete) {
      onDelete(deleteId);
    }
    setIsDeleteDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (sortedData.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-semibold">No forms found</h3>
        <p className="mt-2 text-sm text-gray-500">
          {isAdmin
            ? "Create a new form to get started."
            : "No form data is available for viewing."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[25%] cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center">
                  Name
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </TableHead>
              <TableHead className="w-[35%] cursor-pointer" onClick={() => handleSort("address")}>
                <div className="flex items-center">
                  Address
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </TableHead>
              <TableHead className="w-[15%] cursor-pointer" onClick={() => handleSort("pin")}>
                <div className="flex items-center">
                  PIN
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </TableHead>
              <TableHead className="w-[15%] cursor-pointer" onClick={() => handleSort("phone")}>
                <div className="flex items-center">
                  Phone
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </TableHead>
              {isAdmin && (
                <TableHead className="w-[10%] text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {sortedData.map((form) => (
                <motion.tr
                  key={form.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{form.name}</TableCell>
                  <TableCell>{form.address}</TableCell>
                  <TableCell>{form.pin}</TableCell>
                  <TableCell>{form.phone}</TableCell>
                  {isAdmin && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit && onEdit(form)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(form.id!)}
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this form? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}