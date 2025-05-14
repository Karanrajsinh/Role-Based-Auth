import { useState } from 'react';
import { FormData, FormError } from '@/lib/types/form';
import { useToast } from '@/hooks/use-toast';

export function useFormSubmission() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormError>({});
  const { toast } = useToast();

  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.name) {
      errors.name = 'Name is required';
    }

    if (!data.address) {
      errors.address = 'Address is required';
    }

    if (!data.pin) {
      errors.pin = 'PIN is required';
    } else if (data.pin.length !== 6 || !/^\d{6}$/.test(data.pin)) {
      errors.pin = 'PIN must be 6 digits';
    }

    if (!data.phone) {
      errors.phone = 'Phone number is required';
    } else if (data.phone.length !== 10 || !/^\d{10}$/.test(data.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }

    return errors;
  };

  const createForm = async (data: FormData): Promise<FormData | null> => {
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return null;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create form');
      }

      const result = await response.json();
      toast({
        title: 'Success',
        description: 'Form created successfully',
      });
      setErrors({});
      return result;
    } catch (error) {
      console.error('Error creating form:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create form',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateForm = async (data: FormData): Promise<FormData | null> => {
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return null;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/forms', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update form');
      }

      const result = await response.json();
      toast({
        title: 'Success',
        description: 'Form updated successfully',
      });
      setErrors({});
      return result;
    } catch (error) {
      console.error('Error updating form:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update form',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteForm = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch('/api/forms', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete form');
      }

      toast({
        title: 'Success',
        description: 'Form deleted successfully',
      });
      return true;
    } catch (error) {
      console.error('Error deleting form:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete form',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errors,
    createForm,
    updateForm,
    deleteForm,
  };
}