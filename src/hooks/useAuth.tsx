import { uselogInStore } from "@/libs/store";
import { useRouter } from "next/router";

export default function useAuth() {
  const router = useRouter();
  const { isLoggedIn, setLogIn, setLogOut } = uselogInStore();

  const handleLogin = () => {
    if (isLoggedIn === false) {
      setLogIn(isLoggedIn);
      router.back();
    }
    return;
  };

  const handleLogOut = () => {
    if (isLoggedIn  === true) {
      setLogOut(isLoggedIn);
      router.push("/");
    }
    return;
  };

  const AuthFilter = (action:Promise<boolean>) => {
    if (isLoggedIn === false) {
      router.push("/login");
    }
    else{
      action;
    }
  };

  return { handleLogin, handleLogOut, AuthFilter, isLoggedIn };
}
