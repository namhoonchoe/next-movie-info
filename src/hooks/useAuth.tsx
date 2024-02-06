import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function useAuth() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const handleLogin = () => {
    if (session) {
      router.back();
    }
    return;
  };

  const handleLogOut = () => {
    if (session) {
      router.push("/");
    }
    return;
  };

  const AuthFilter = (action: Promise<boolean>) => {
    if (session) {
      router.push("/signin");
    } else {
      action;
    }
  };

  return { handleLogin, handleLogOut, AuthFilter };
}
