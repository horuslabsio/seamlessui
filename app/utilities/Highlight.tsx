"use client";
import { codeToHtml } from "shiki";
import { useEffect, useState } from "react";

export function Highlight({
  code,
  activeTab,
}: {
  code: string;
  activeTab: 0 | 1;
}) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    const convertCodeToHtml = async () => {
      const out = await codeToHtml(code, {
        lang: "ts",
        theme: "night-owl",
      });
      setHtml(out);
    };

    convertCodeToHtml();
  }, [code]);

  return (
    <div
      className={`col-start-1 row-start-[1] row-end-1 h-full overflow-auto rounded-[8px] bg-[#051626] p-8 text-[.85em] leading-4 ${activeTab === 1 ? "pointer-events-auto min-h-[900px] opacity-100" : "pointer-events-none max-h-[900px] overflow-hidden opacity-0"}`}
    >
      {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null}
    </div>
  );
}
