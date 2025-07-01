import { DashboardSidebar } from "@/components/dashboard/sidebar-server";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <SidebarInset>
          <main className="flex-1 p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
