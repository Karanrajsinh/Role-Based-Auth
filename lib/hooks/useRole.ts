import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Role } from '@/lib/types/user';
import { useToast } from '@/hooks/use-toast';

export function useRole() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const selectRole = async (role: Role) => {
    setLoading(true);
    try {
      const response = await fetch('/api/role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title : 'Error',
          variant : 'destructive',
          description :errorData.error || 'Failed to set role'});
      }

      toast({
        title: 'Role Selected',
        description: `You are now a ${role.toLowerCase()}.`,
      });

      // Redirect to appropriate dashboard
      if (role === 'ADMIN') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/guest');
      }
    } catch (error) {
      console.error('Error setting role:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to set role',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    selectRole,
  };
}