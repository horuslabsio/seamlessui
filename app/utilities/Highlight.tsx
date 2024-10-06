"use client";
import { codeToHtml } from "shiki";
import { useEffect, useState } from "react";

export function Highlight({ code }: { code: string }) {
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
    <div className="h-full min-h-[900px] overflow-auto rounded-[8px] bg-[#051626] p-8 text-[.85em] leading-4">
      {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null}
    </div>
  );
}
