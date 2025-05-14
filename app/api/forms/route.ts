import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createForm, deleteForm, getForms, updateForm } from "@/lib/api/forms";
import { FormData } from "@/lib/types/form";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const forms = await getForms(user.id);
    return NextResponse.json(forms);
  } catch (error) {
    console.error("Error in GET /api/forms:", error);
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData: FormData = await request.json();
    
    // Validate form data
    if (!formData.name || !formData.address || !formData.pin || !formData.phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate PIN and phone
    if (formData.pin.length !== 6 || !/^\d{6}$/.test(formData.pin)) {
      return NextResponse.json(
        { error: "PIN must be 6 digits" },
        { status: 400 }
      );
    }

    if (formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
      return NextResponse.json(
        { error: "Phone number must be 10 digits" },
        { status: 400 }
      );
    }

    const form = await createForm(formData, user.id);
    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/forms:", error);
    return NextResponse.json(
      { error: "Failed to create form" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, ...formData }: FormData = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Form ID is required" },
        { status: 400 }
      );
    }

    // Validate form data
    if (!formData.name || !formData.address || !formData.pin || !formData.phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate PIN and phone
    if (formData.pin.length !== 6 || !/^\d{6}$/.test(formData.pin)) {
      return NextResponse.json(
        { error: "PIN must be 6 digits" },
        { status: 400 }
      );
    }

    if (formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
      return NextResponse.json(
        { error: "Phone number must be 10 digits" },
        { status: 400 }
      );
    }

    const form = await updateForm(id, formData, user.id);
    return NextResponse.json(form);
  } catch (error) {
    console.error("Error in PUT /api/forms:", error);
    return NextResponse.json(
      { error: "Failed to update form" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Form ID is required" },
        { status: 400 }
      );
    }

    await deleteForm(id, user.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/forms:", error);
    return NextResponse.json(
      { error: "Failed to delete form" },
      { status: 500 }
    );
  }
}