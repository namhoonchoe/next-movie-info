import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
export default function useCheckXL() {
  const [isExtraLarge,setIsExtraLarge] = useState<boolean>(true);
  const isLargerThan1440 = useMediaQuery("(min-width: 1440px)");
  useEffect(() => {
    const checkSize = () => {
      if (isLargerThan1440) {
        setIsExtraLarge(true);
      } else {
        setIsExtraLarge(false);
      }
    };

    window.addEventListener("resize", checkSize);

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, [isExtraLarge, isLargerThan1440]);

  useEffect(() => {
    const checkInitialSize = () => {
      if (!isLargerThan1440) {
        setIsExtraLarge(false);
      } else {
        setIsExtraLarge(true)
      }
    };

    let mounted = true;

    if (mounted) {
      checkInitialSize();
    }

    return () => {
      mounted = false;
    };
  }, [isExtraLarge, isLargerThan1440]);
  return {
    isExtraLarge
}
}
