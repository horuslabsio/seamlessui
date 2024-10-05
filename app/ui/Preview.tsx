import { Highlight } from "@/app/utilities/Highlight";
import Iframe from "@/app/utilities/Iframe";
import { ReactElement, cloneElement, isValidElement, useState } from "react";
import { Variant, VariantsProps } from "@/types";
import Dropdown from "./Dropdown";
import { BulbIcon, CodeIcon, CopyIcon, EyeIcon } from "@/public/icons/icons";

interface ChildProps {
  layout: Variant;
  theme: "light" | "dark";
}

type Props = {
  name: string;
  description: string;
  children: ReactElement<ChildProps>;
  codeString: string;
  variants: VariantsProps;
};

const Preview = ({
  codeString,
  children,
  description,
  name,
  variants,
}: Props) => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [variant, setVariant] = useState<Variant>(variants[0]);

  const options = variants.map((opt) => ({
    optName: opt,
    optTitle: `${opt} Variant`,
    optFunc: () => setVariant(opt), // Function to set variant
  }));

  const modifiedChildren = isValidElement(children)
    ? cloneElement(children as React.ReactElement, { layout: variant, theme }) // Casting children as ReactElement
    : children;

  return (
    <div>
      <div className="mb-20">
        <h2 className="mb-8">{name}</h2>
        <p>{description}</p>
      </div>

      <div className="flex h-screen flex-col py-4">
        <div className="mb-8 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <p className="mr-4">{name}</p>

            <div className="relative z-50">
              <Dropdown
                name={`${variant} variant`}
                selectedOption={variant}
                options={options}
              />
            </div>

            <button
              onClick={() => {
                setTheme((prev) => (prev === "light" ? "dark" : "light"));
              }}
              className={`grid h-8 w-8 rotate-180 place-content-center rounded-full border border-black ${theme === "light" ? "bg-black text-white" : "text-black"} text-[1.2em]`}
            >
              <BulbIcon />
            </button>
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

            <p>React</p>
            <button>
              <CopyIcon />
            </button>
          </div>
        </div>
        <div className="flex-1">
          {activeTab === 0 ? (
            <div className="relative grid h-full rounded-[8px] bg-[#e4e4e4]">
              <Iframe>{modifiedChildren}</Iframe>
            </div>
          ) : (
            <Highlight code={codeString} />
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
      className={`flex min-w-[6rem] items-center justify-center gap-1 rounded-[8px] p-1 ${isActive ? "bg-black text-white" : "text-grey-500"}`}
    >
      <span className={`${isActive ? "text-white" : "text-black"}`}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
};
