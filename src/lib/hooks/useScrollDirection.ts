// hooks/useScrollDirection.ts
import { useEffect, useState } from "react";

const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > prevScrollPos) {
        // Scrolling down
        setScrollDir("down");
      } else {
        // Scrolling up
        setScrollDir("up");
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return scrollDir;
};

export default useScrollDirection;
