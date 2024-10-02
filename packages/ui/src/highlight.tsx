import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { codeToHast } from "shiki";
import { jsx, jsxs } from "react/jsx-runtime";

export function Highlight({ code }: { code: string }) {
  return (
    <div className="overflow-auto bg-[#051626] p-8 text-[.85em] leading-4">
      <CodeBlock code={code} />
    </div>
  );
}

async function CodeBlock({ code }: { code: string }) {
  const out = await codeToHast(code, {
    lang: "ts",
    theme: "night-owl",
  });

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (props) => <pre data-custom-codeblock {...props} />,
    },
  });
}
