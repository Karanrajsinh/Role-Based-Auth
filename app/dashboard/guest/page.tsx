import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { GuestDashboard } from "@/app/components/GuestDashboard";
import { getUserRole } from "@/lib/clerk";
import { Header } from "@/app/components/Header";

export default async function GuestDashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const role = await getUserRole();

  if (role !== "GUEST") {
    redirect("/role-selection");
  }

  const userName = user.firstName || "Guest";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <GuestDashboard userName={userName} />
      </main>
    </div>
  );
}