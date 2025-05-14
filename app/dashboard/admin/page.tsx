import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { AdminDashboard } from "@/app/components/AdminDashboard";
import { getUserRole } from "@/lib/clerk";
import { Header } from "@/app/components/Header";

export default async function AdminDashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const role = await getUserRole();

  if (role !== "ADMIN") {
    redirect("/role-selection");
  }

  const userName = user.firstName || "Admin";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <AdminDashboard userName={userName} />
      </main>
    </div>
  );
}