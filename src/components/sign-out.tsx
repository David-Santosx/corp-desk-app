import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const router = useRouter();

  const signOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            console.log("Sign out successful");
            router.push("/auth");
          },
          onError: (error) => {
            console.error("Error during sign out:", error);
          }
        }
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return signOut;
}
