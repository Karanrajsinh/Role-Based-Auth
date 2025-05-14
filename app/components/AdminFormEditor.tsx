"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormData } from "@/lib/types/form";
import { useFormSubmission } from "@/lib/hooks/useFormSubmission";
import { Button } from "@/app/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { motion } from "framer-motion";

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  pin: z.string().regex(/^\d{6}$/, "PIN must be 6 digits"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

interface AdminFormEditorProps {
  initialData?: FormData | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function AdminFormEditor({ initialData, onCancel, onSuccess }: AdminFormEditorProps) {
  const { createForm, updateForm, loading, errors: apiErrors } = useFormSubmission();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: initialData?.id || undefined,
      name: initialData?.name || "",
      address: initialData?.address || "",
      pin: initialData?.pin || "",
      phone: initialData?.phone || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    let success = false;

    if (initialData?.id) {
      // Update existing form
      const result = await updateForm(data as FormData);
      success = !!result;
    } else {
      // Create new form
      const result = await createForm(data as FormData);
      success = !!result;
    }

    if (success) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
                {apiErrors?.name && <p className="text-sm font-medium text-destructive mt-1">{apiErrors.name}</p>}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
                {apiErrors?.address && <p className="text-sm font-medium text-destructive mt-1">{apiErrors.address}</p>}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN (6 digits)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter PIN" maxLength={6} {...field} />
                </FormControl>
                <FormMessage />
                {apiErrors?.pin && <p className="text-sm font-medium text-destructive mt-1">{apiErrors.pin}</p>}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (10 digits)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" maxLength={10} {...field} />
                </FormControl>
                <FormMessage />
                {apiErrors?.phone && <p className="text-sm font-medium text-destructive mt-1">{apiErrors.phone}</p>}
              </FormItem>
            )}
          />
        </div>

        <motion.div
          className="flex justify-end gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="animate-spin mr-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </span>
                {initialData?.id ? "Updating..." : "Creating..."}
              </>
            ) : (
              initialData?.id ? "Update Form" : "Create Form"
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}