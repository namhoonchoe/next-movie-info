import { uselogInStore } from "@/libs/store";
import { useRouter } from "next/router";

export default function useAuth() {
  const router = useRouter();
  const { isLoggedIn, setLogIn, setLogOut } = uselogInStore();

  const handleLogin = () => {
    if (!isLoggedIn) {
      setLogIn(isLoggedIn);
      router.back();
    }
    return;
  };

  const handleLogOut = () => {
    if (isLoggedIn) {
      setLogOut(isLoggedIn);
      router.back();
    }
    return;
  };

  const AuthFilter = (action:Promise<boolean>) => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    else{
      action;
    }
  };

  return { handleLogin, handleLogOut, AuthFilter };
}
