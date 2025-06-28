import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
    const router = useRouter();
  const handleSignOut = async () => {
    try {
        await authClient.signOut(
            {
                fetchOptions: {
                    onSuccess: () => {
                        console.log("Sign out successful");
                        router.push("/auth/login"); // Redirect to login page after sign out
                    },
                    onError: (error) => {
                        console.error("Error during sign out:", error);
                    }
                }
            }
        );
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button onClick={handleSignOut}>Sign out</Button>
  );
}