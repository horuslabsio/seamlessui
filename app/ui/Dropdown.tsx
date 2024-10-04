import { CheckIcon, DownChevronIcon } from "@/public/icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

type Option = {
  optName: string;
  optTitle?: string;
  optFunc?: () => void;
};

type Props = {
  name: string;
  options: Option[];
  selectedOption: string;
  //   onSelect: (option: Option) => void;
};

const Dropdown = ({ name, options, selectedOption }: Props) => {
  return (
    <Menu>
      <MenuButton className="flex items-center gap-2 rounded-full border border-black px-4 py-1">
        <span className="capitalize">{name}</span>
        <span>
          <DownChevronIcon />
        </span>
      </MenuButton>
      <MenuItems
        modal={false}
        className="absolute top-[calc(100%+.5rem)] flex min-w-[12rem] flex-col gap-2 rounded-[8px] bg-white p-4 shadow-lg"
      >
        {options.map((option) => (
          <MenuItem key={option.optName}>
            <button
              className="flex w-full items-center gap-2 rounded-[8px] border border-transparent p-1 text-start hover:border-grey-200 hover:bg-grey-100 focus:border-grey-200 focus:bg-grey-100"
              onClick={() => {
                option.optFunc && option.optFunc();
              }}
            >
              <span
                className={`${
                  selectedOption === option.optName
                    ? "opacity-100"
                    : "opacity-0"
                }`}
                aria-hidden={true}
              >
                <CheckIcon />
              </span>
              <span className="capitalize">
                {option.optTitle ? option.optTitle : option.optName}
              </span>
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
