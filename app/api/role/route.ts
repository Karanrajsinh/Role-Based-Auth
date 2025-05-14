import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { updateUserRole } from "@/lib/api/role";
import { Role } from "@/lib/types/user";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await request.json();

    if (!role || (role !== "ADMIN" && role !== "GUEST")) {
      return NextResponse.json(
        { error: "Invalid role. Must be ADMIN or GUEST" },
        { status: 400 }
      );
    }

    const result = await updateUserRole(role as Role);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/role:", error);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 }
    );
  }
}