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
  }, [code]); // Run effect when code changes

  return (
    <div className="overflow-auto bg-[#051626] p-8 text-[.85em] leading-4">
      {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null}
    </div>
  );
}
