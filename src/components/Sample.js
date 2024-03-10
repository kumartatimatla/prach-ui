import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
  DropdownSection,
} from "@nextui-org/react";

export default function Sample() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <div className="mt-[100px]">
      <Dropdown
        showArrow
        placement="right-start"
        className=""
        classNames={{
          base: "before:bg-default-200 ",
          content: "shadow-md",
        }}
      >
        <DropdownTrigger>
          <Button variant="bordered">Open Menu</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          <DropdownItem key="new" description="Create a new file">
            New file
          </DropdownItem>
          <DropdownItem key="new" description="Create a new file">
            New file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
