import { setUserRole } from "@/lib/clerk";
import { Role } from "@/lib/types/user";

export async function updateUserRole(role: Role) {
  try {
    await setUserRole(role);
    return { success: true, role };
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
}