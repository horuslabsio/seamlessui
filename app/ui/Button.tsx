import { ReactNode, forwardRef } from "react";

type Props = {
  variant?: "default" | "icon" | "big" | "ghost";
  children: ReactNode | string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const buttonProps = {
  default:
    "flex items-center gap-2 rounded-[12px] bg-base-dark px-4 py-2 text-base-light",
  icon: "flex items-center h-8 w-8 rounded-full justify-center p-2 bg-base-dark text-base-light text-[1.2em]",
  big: "flex items-center justify-center gap-2 rounded-[12px] bg-base-dark px-6 py-3 text-base-light",
  ghost: "",
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "default", className = "", children, ...props }, ref) => {
    const buttonClass =
      `font-helvetica-bold ${buttonProps[variant]} ${className}`.trim();

    return (
      <button ref={ref} className={buttonClass} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
