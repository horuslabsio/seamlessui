import { Highlight } from "@/app/utilities/Highlight";
import Iframe from "@/app/utilities/Iframe";
import {
  ReactElement,
  cloneElement,
  isValidElement,
  useRef,
  useState,
} from "react";
import { ThemeProps, VariantsProps } from "@/types";
import Dropdown from "./Dropdown";
import { BulbIcon, CodeIcon, EyeIcon } from "@/public/icons/icons";
import { useDimension } from "@/hooks/useDimension";
import CopyButton from "../utilities/CopyButton";
import Button from "./Button";

interface ChildProps {
  layout: VariantsProps;
  theme: ThemeProps;
}

type Props = {
  name: string;
  description: string;
  children: ReactElement<ChildProps>;
  codeStringGenerator: ({
    full,
    theme,
    variant,
  }: {
    theme?: ThemeProps;
    variant?: VariantsProps;
    full?: boolean;
  }) => string;
  variants: VariantsProps[];
  themeVariants?: boolean;
  layoutVariants?: boolean;
  full?: boolean;
  fullScreen?: boolean;
};

const Preview = ({
  codeStringGenerator,
  children,
  description,
  name,
  variants,
  themeVariants = true,
  layoutVariants = true,
  full = true,
  fullScreen = false,
}: Props) => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [theme, setTheme] = useState<ThemeProps>("light");
  const [variant, setVariant] = useState<VariantsProps>(variants[0]);
  const headerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimension({ refElement: headerRef });

  const options = variants.map((opt) => ({
    optName: opt,
    optTitle: `${opt} Variant`,
    optFunc: () => setVariant(opt), // Function to set variant
  }));

  const modifiedChildren = isValidElement(children)
    ? (() => {
        const hasLayout = "layout" in children.props;
        const hasTheme = "theme" in children.props;

        if (hasLayout && hasTheme) {
          return cloneElement(children, { layout: variant, theme });
        } else if (hasLayout) {
          return cloneElement(children, { layout: variant });
        } else if (hasTheme) {
          return cloneElement(children, { theme });
        } else {
          return children;
        }
      })()
    : children;

  const finalCodeString = codeStringGenerator({ theme, variant, full });

  return (
    <div>
      <div className="mb-20 max-w-[900px] px-2 md:px-0">
        <h2 className="mb-8 text-3xl font-bold capitalize">{name}</h2>
        <p>{description}</p>
      </div>

      <div className="flex flex-col py-4">
        <div
          ref={headerRef}
          className="mb-8 flex items-center justify-between px-2 md:px-4"
        >
          <div className="flex items-center gap-2">
            <div className="flex w-fit flex-wrap items-center gap-2">
              <p className="mr-4 text-lg font-bold capitalize">{`${name} ${layoutVariants ? `- ${variant}` : ""}`}</p>

              {layoutVariants && (
                <div className="relative z-50">
                  <Dropdown
                    name={`${variant} variant`}
                    selectedOption={variant}
                    options={options}
                  />
                </div>
              )}
            </div>
            {themeVariants && (
              <Button
                variant="ghost"
                onClick={() => {
                  setTheme((prev) => (prev === "light" ? "dark" : "light"));
                }}
                className={`mr-2 grid h-8 min-w-8 rotate-180 place-content-center rounded-full border border-black ${theme === "light" ? "bg-black text-white" : "text-black"} text-[1.2em]`}
              >
                <BulbIcon />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative mr-4 flex gap-2 rounded-[8px] bg-[#e4e4e4] p-1">
              <Tab
                isActive={activeTab === 0}
                icon={<EyeIcon />}
                label="Preview"
                onClick={() => setActiveTab(0)}
              />
              <Tab
                isActive={activeTab === 1}
                icon={<CodeIcon />}
                label="Code"
                onClick={() => setActiveTab(1)}
              />
              <div className="absolute left-[calc(100%+1rem)] top-1/2 h-[80%] w-[1px] -translate-y-1/2 bg-black"></div>
            </div>

            <p className="hidden lg:block">React</p>
            <CopyButton
              className="text-[1.5em] text-grey-500"
              copyText={finalCodeString}
            />
          </div>
        </div>
        <div>
          {activeTab === 0 ? (
            <div
              style={{
                height: `calc(100vh - ${dimensions.height}px)`,
              }}
              className="relative grid h-full max-h-[900px] rounded-[8px] bg-[#e4e4e4]"
            >
              <Iframe fullScreen={fullScreen}>{modifiedChildren}</Iframe>
            </div>
          ) : (
            <Highlight code={finalCodeString} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;

type TabProps = {
  isActive: boolean;
  icon: JSX.Element;
  label: string;
  onClick: () => void;
};

const Tab = ({ isActive, icon, label, onClick }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-[38px] w-[38px] items-center justify-center gap-1 rounded-[8px] p-1 lg:min-w-[6rem] ${isActive ? "bg-black text-white" : "text-grey-500"}`}
    >
      <span className={`${isActive ? "text-white" : "text-black"}`}>
        {icon}
      </span>
      <span className="hidden lg:block">{label}</span>
    </button>
  );
};
