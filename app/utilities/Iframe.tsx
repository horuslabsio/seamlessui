"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const customStyles = `
    body{
      display: grid;
      place-content: center;
    }
    dialog {
      transform: translateY(10%);
    }
    dialog,
    ::backdrop {
      opacity: 0;
      transition-property: opacity display overlay;
      transition-duration: 0.5s;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-behavior: allow-discrete;
    }
    dialog[open] {
      opacity: 1;
      transform: translateY(0);
    }
    dialog[open],
    dialog[open]::backdrop {
      opacity: 1;
      backdrop-filter: blur(5px);
    }
    @starting-style {
      dialog[open] {
        opacity: 0;
        transform: translateY(10%);
      }
      dialog[open]::backdrop {
        opacity: 0;
      }
    }
`;

const Iframe = ({ children, ...props }: { children: ReactNode }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.style.opacity = "0";

      const iframeDoc = iframe.contentDocument;
      if (iframeDoc) {
        // Add Tailwind CSS via the script from CDN
        const script = iframeDoc.createElement("script");
        script.src = "https://cdn.tailwindcss.com";

        iframeDoc.head.appendChild(script);

        //Configure Tailwind after loading
        script.onload = () => {
          // @ts-ignore
          iframe.contentWindow.tailwind.config = {};
          iframe.style.opacity = "1";
        };

        // Create and append the custom styles
        const style = iframeDoc.createElement("style");
        style.appendChild(iframeDoc.createTextNode(customStyles));
        iframeDoc.head.appendChild(style);

        setMountNode(iframeDoc.body);
      }
    }
  }, []);

  return (
    <iframe className="h-full w-full" {...props} ref={iframeRef}>
      {mountNode ? createPortal(children, mountNode) : null}
    </iframe>
  );
};

export default Iframe;
