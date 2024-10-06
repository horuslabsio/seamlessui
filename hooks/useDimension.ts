import { useEffect, useState } from "react";

export function useDimension({
  refElement,
}: {
  refElement: React.RefObject<HTMLElement>;
}) {
  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
    resolution: 0,
  });

  const updateDimensions = () => {
    if (refElement.current) {
      const { clientWidth, clientHeight } = refElement.current;
      setDimension({
        width: clientWidth,
        height: clientHeight,
        resolution: clientWidth * clientHeight,
      });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [refElement]);

  return dimension;
}
