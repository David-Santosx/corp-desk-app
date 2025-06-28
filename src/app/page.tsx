import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return (
      <>
        <div>Not authenticated</div>
        <a href="/auth/login">Sign in</a>;
      </>
    );
  }
  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <Image
        src={session.user.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
        alt="User Avatar"
        width={100}
        height={100}
      />
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
      <a href="/auth/logout">Logout</a>
    </div>
  );
}
