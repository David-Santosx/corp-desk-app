"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  SettingsIcon,
  UserIcon,
  LogOutIcon,
  EllipsisVertical,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { sidebarItems } from "./sidebar-items";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import {
  Ticket,
  PlusCircle,
  User,
  LogOut,
  UserCheck,
  ListChecks,
  FileText,
  UserPlus,
  Tags,
  Users,
  UserCog,
  BarChart2,
  Tag,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SignOutButton } from "../sign-out-button";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const icons = {
  Ticket,
  PlusCircle,
  User,
  LogOut,
  UserCheck,
  ListChecks,
  FileText,
  UserPlus,
  Tags,
  Users,
  UserCog,
  BarChart2,
  Tag,
};

type UserProps = {
  name: string;
  image?: string;
  email: string;
  isLoading?: boolean;
  role?: "user" | "tech" | "admin";
};

export function DashboardSidebarClient({ user }: { user: UserProps }) {
  const role = user.role || "user";
  const items = sidebarItems[role];
  const pathname = usePathname();

  return (
    <Sidebar className="flex flex-col min-h-screen text-sm">
      <SidebarHeader className="flex flex-col items-center pt-8">
        <Image
          src="/corp-desk-logo.svg"
          alt="Corp Desk Logo"
          width={128}
          height={128}
          quality={100}
          priority
        />
        <Label className="mt-4 text-xs text-white/60 text-center">
          Você está logado como
          <Label className="underline text-white/90">
            {role === "admin"
              ? "administrador."
              : role === "tech"
              ? "técnico."
              : "colaborador."}
          </Label>
        </Label>
      </SidebarHeader>
      <Separator className="my-4" />
      <SidebarMenu className="flex-1 px-2">
        {items.map((group, idx) => (
          <Collapsible
            key={group.title}
            className="group/collapsible mb-3 border p-1 border-white/10 rounded-md"
            defaultOpen={idx === 0}
          >
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex items-center justify-between w-full font-bold text-white/80 px-3 py-1 focus:outline-none"
              >
                <span>{group.title}</span>
                <ChevronDown className="ml-auto w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div>
                {group.items.map((item) => {
                  const Icon = icons[item.icon as keyof typeof icons];
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                          hover:bg-[#232326]
                          ${
                            isActive
                              ? "bg-[#1a1a1d] border-l-4 border-primary text-primary"
                              : "text-white/90"
                          }
                        `}
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarMenu>
      <Separator />
      <SidebarFooter className="px-2 pt-3">
        {user.isLoading ? (
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-12 h-3 rounded" />
            </div>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer rounded-md hover:bg-[#232326] p-2 transition-colors">
                <Avatar>
                  <AvatarImage
                    src={user.image || "/user-avatar.png"}
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    <UserIcon className="w-5 h-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-white text-sm">
                    {user.name}
                  </span>
                  <span className="text-xs text-center text-white/60">
                    {user.email}
                  </span>
                </div>
                <EllipsisVertical className="w-4 h-4 text-primary ml-auto" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="left"
              className="w-52 bg-[#232326] border-[#232326] text-white shadow-lg"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/perfil"
                  className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#29292e] transition-colors"
                  aria-label="Ir para perfil"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/configuracoes"
                  className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#29292e] transition-colors"
                  aria-label="Ir para configurações"
                >
                  <SettingsIcon className="w-5 h-5" />
                  <span>Configurações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="flex w-full items-center gap-3 px-2 py-2 rounded text-red-500 hover:bg-red-500/10 transition-colors"
                    aria-label="Sair"
                  >
                    <LogOutIcon className="w-5 h-5" />
                    <span className="text-[14px]">Sair</span>
                  </Button>
                </SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Separator className="mt-2" />
        <Link
          target="_blank"
          href={"https://github.com/David-Santosx"}
          className="w-full text-center"
        >
          <span className="text-[9px]">
            Desenvolvido por{" "}
            <span className="text-primary">
              David Santos - &copy; {new Date().getFullYear()}
            </span>
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
