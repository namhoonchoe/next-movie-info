import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function useAuthFilter() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const AuthFilter = (navigateTo: string) => {
      if (session) {
      router.push(`${navigateTo}`);
    } else {
      setIsModalOpen(true);
    }
  };

  return { AuthFilter, isModalOpen, setIsModalOpen };
}
