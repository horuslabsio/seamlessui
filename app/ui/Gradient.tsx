"use client";
import { useEffect, useRef, useState } from "react";

const Gradient = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTableSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setCols(Math.floor(width / 70));
        setRows(Math.floor(height / 70));
      }
    };

    updateTableSize();
    window.addEventListener("resize", updateTableSize);

    return () => {
      window.removeEventListener("resize", updateTableSize);
    };
  }, []);
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute left-1/2 -z-10 mx-auto h-screen max-h-[1024px] w-screen -translate-x-1/2 overflow-hidden bg-blend-difference seamlessui-container"
    >
      <div className="absolute inset-0 z-[1] transform-gpu overflow-hidden">
        <div className="absolute left-0 top-0 h-[20%] w-full bg-white mix-blend-difference blur-lg" />
      </div>
      <div className="absolute inset-0 top-[12%] z-[2] transform-gpu overflow-hidden blur-[28px]">
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

      <div className="relative h-full w-full">
        <table className="h-full w-full border-collapse">
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: cols }).map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="h-[70px] w-[70px] border border-[#7a7a7a66] bg-white mix-blend-overlay"
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gradient;
