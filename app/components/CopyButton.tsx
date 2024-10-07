import { FormEvent, useEffect, useState } from "react";
import { Check, Copy as CopyIcon } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
  copyText: string;
  buttonText?: string;
  className?: string;
  iconClassName?: string;
};

function CopyButton({
  copyText,
  buttonText,
  className,
  iconClassName = "",
}: Props) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const id = setTimeout(() => setIsCopied(false), 1500);
      return () => clearTimeout(id);
    }
  }, [isCopied]);

  function handleCopyClick(e: FormEvent) {
    e.stopPropagation();
  }

  return (
    <CopyToClipboard text={copyText} onCopy={() => setIsCopied(true)}>
      <button
        aria-label={isCopied ? "Copied!" : "copy"}
        aria-live="assertive"
        title={isCopied ? "Copied!" : "click to copy address"}
        onClick={(e) => handleCopyClick(e)}
        className={className}
      >
        <span>{buttonText}</span>
        <span aria-hidden className={iconClassName}>
          {isCopied ? <Check size={16} /> : <CopyIcon size={16} />}
        </span>
      </button>
    </CopyToClipboard>
  );
}

export default CopyButton;
