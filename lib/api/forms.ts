import { FormData } from "@/lib/types/form";
import { prisma } from "@/lib/prisma";

export async function getForms(userId: string) {
  try {
    // Find the user by clerk ID
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Get all forms
    const forms = await prisma.form.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return forms;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error;
  }
}

export async function createForm(formData: FormData, userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const form = await prisma.form.create({
      data: {
        name: formData.name,
        address: formData.address,
        pin: formData.pin,
        phone: formData.phone,
        userId: user.id,
      },
    });

    return form;
  } catch (error) {
    console.error("Error creating form:", error);
    throw error;
  }
}

export async function updateForm(id: string, formData: FormData, userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the form exists and belongs to the user
    const existingForm = await prisma.form.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingForm) {
      throw new Error("Form not found or you don't have permission to update it");
    }

    const form = await prisma.form.update({
      where: {
        id,
      },
      data: {
        name: formData.name,
        address: formData.address,
        pin: formData.pin,
        phone: formData.phone,
      },
    });

    return form;
  } catch (error) {
    console.error("Error updating form:", error);
    throw error;
  }
}

export async function deleteForm(id: string, userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the form exists and belongs to the user
    const existingForm = await prisma.form.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingForm) {
      throw new Error("Form not found or you don't have permission to delete it");
    }

    await prisma.form.delete({
      where: {
        id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting form:", error);
    throw error;
  }
}