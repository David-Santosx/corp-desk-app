import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MailIcon, UserIcon, BadgeCheckIcon } from "lucide-react";

export default async function PerfilPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md bg-[#232326] border-none shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.image || "/user-avatar.png"} alt={user?.name || "Avatar"} />
            <AvatarFallback>
              <UserIcon className="w-8 h-8 text-[#ff6900]" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-white text-xl mt-2 flex items-center gap-2">
            {user?.name}
            <BadgeCheckIcon className="w-5 h-5 text-[#ff6900]" aria-label="Conta verificada" />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-2 text-[#bdbdbd]">
            <MailIcon className="w-4 h-4 text-[#ff6900]" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-[#bdbdbd]">
            <UserIcon className="w-4 h-4 text-[#ff6900]" />
            <span>{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Usuário"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}