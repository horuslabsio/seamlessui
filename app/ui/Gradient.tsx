"use client";
import { usePathname } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";

const Gradient = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const path = usePathname();

  // Debounce resize events to improve performance
  const debounce = (func: () => void, timeout = 100) => {
    let timer: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => func(), timeout);
    };
  };

  useEffect(() => {
    const updateTableSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setCols(Math.floor(width / 70));
        setRows(Math.floor(height / 70));
      }
    };

    const debouncedResize = debounce(updateTableSize);

    updateTableSize();
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute left-1/2 -z-10 mx-auto h-screen w-full -translate-x-1/2 overflow-hidden bg-blend-difference"
    >
      <div className="absolute inset-0 z-[1] transform-gpu overflow-hidden">
        <div className="absolute left-0 top-0 h-[20%] w-full bg-white mix-blend-difference blur-lg" />
      </div>
      <div
        className={`absolute inset-0 top-[12%] z-[2] transform-gpu overflow-hidden ${path === "/" ? "blur-[28px]" : "blur-[128px]"}`}
      >
        <div
          style={{
            background: `radial-gradient(81.6% 120.7% at 52.81% -16.97%, rgba(245, 245, 245, 0.9) 14.17%, rgba(253, 147, 50, 0.92) 39.2%, rgba(245, 245, 245, 1) 79.17%)`,
          }}
          className="absolute left-0 top-1/4 h-[70%] w-full -translate-y-1/4 opacity-[0.95] mix-blend-difference"
        />
      </div>
      <div className="absolute inset-0 z-[1] transform-gpu overflow-hidden">
        <div className="absolute bottom-0 left-0 h-[50%] w-full bg-white mix-blend-difference" />
      </div>

      {rows > 0 && cols > 0 && (
        <div
          className="relative grid h-full w-full"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 70px)`,
            gridTemplateRows: `repeat(${rows}, 70px)`,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, index) => (
            <div
              key={index}
              className="border border-[#7a7a7a66] border-r-transparent border-t-transparent bg-white mix-blend-overlay"
              style={{ height: "70px", width: "70px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Gradient);
