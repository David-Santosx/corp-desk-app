import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DashboardSidebarClient } from "./sidebar-client"

export async function DashboardSidebar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <DashboardSidebarClient
      user={{
        name: session?.user?.name || "Usuário",
        image: session?.user?.image || "",
        email: session?.user?.email || "",
        isLoading: !session,
        role: (session?.user?.role === "user" || session?.user?.role === "admin" || session?.user?.role === "tech")
          ? session.user.role
          : "user",
      }}
    />
  );
}