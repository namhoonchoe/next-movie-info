import { useEffect, useState } from "react";

export default function useImageLoad() {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!isImageLoading) {
        setTimeout(() => setShowSkeleton(false), 500)
        
      }
    }
    return () => {
      mounted = false;
    };
  }, [showSkeleton, isImageLoading]);
  return { isImageLoading, showSkeleton, setIsImageLoading };
}