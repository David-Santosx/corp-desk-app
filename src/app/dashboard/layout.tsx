import { DashboardSidebar } from "@/components/dashboard/sidebar-server";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <DashboardSidebar />
        <main className="flex-1 p-8">{children}</main>
    </SidebarProvider>
  );
}
