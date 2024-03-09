import React, { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import useScreenSize from "../utils/useScreenSize";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const Footer = ({ className }) => {
  const { screenWidth } = useScreenSize();
  const footerItems = [
    { key: "prach-community", data: "Prach Community" },
    { key: "case-studies", data: "Case Studies" },
    { key: "the-doctors", data: "The Doctors" },
    { key: "the-advisors", data: "The Advisors" },
    { key: "24/7-prach-assistance", data: "24/7 Prach Assistance" },
    { key: "about-prach", data: "About Prach" },
    { key: "settings", data: "settings" },
    { key: "need-help?", data: "Need Help?" },
    { key: "usage-analytics", data: "usage analytics" },
  ];
  const [footerItemsLimit, setFooterItemsLimit] = useState(0);

  useEffect(() => {
    if (screenWidth >= 1200) {
      setFooterItemsLimit(footerItems.length);
    } else if (screenWidth < 1200 && screenWidth >= 1024) {
      setFooterItemsLimit(5);
    } else if (screenWidth < 1024 && screenWidth >= 600) {
      setFooterItemsLimit(3);
    } else if (screenWidth < 600 && screenWidth >= 400) {
      setFooterItemsLimit(2);
    } else if (screenWidth < 400) {
      setFooterItemsLimit(1);
    }
  }, [footerItems.length, screenWidth]);

  return (
    <footer
      id="footer"
      className={cn(
        "text-[12px] sm:text-[14px] leading-[18px] flex justify-between px-20 py-4 text-[#4A4A4A] redHatMedium font-semibold",
        className
      )}
    >
      <div>&copy; Prach, 2024</div>
      <div className="flex gap-5">
        {footerItems.slice(0, footerItemsLimit).map((item) => {
          return (
            <span key={item.key} className="cursor-pointer">
              {item.data}
            </span>
          );
        })}
        {footerItemsLimit !== footerItems.length && (
          <Dropdown>
            <DropdownTrigger>
              <span className="rotate-90 cursor-pointer">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </span>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dynamic Actions"
              items={footerItems.slice(footerItemsLimit)}
            >
              {(item) => {
                return <DropdownItem key={item.key}>{item.data}</DropdownItem>;
              }}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </footer>
  );
};

export default Footer;
