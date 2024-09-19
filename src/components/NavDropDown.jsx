import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaGithub } from "react-icons/fa";

const NavDropDown = ({ routes }) => {
  return (
    <div className="md:hidden">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="text-2xl">
            <RxHamburgerMenu />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Navigation Menu"
          className="bg-white rounded-xl shadow-xl p-2 w-40 border border-gray-200"
        >
          {routes.map((route) => (
            <DropdownItem key={route.key}>
              <a
                className="block p-2 cursor-pointer hover:bg-gray-100"
                href={route.href} // Direct link to the route
              >
                {route.name}
              </a>
            </DropdownItem>
          ))}
          <DropdownItem>
            <a
              href="https://github.com/Larry8668/sheet-saga"
              target="_blank"
              className="flex items-center justify-center p-1 gap-2 text-base border-slate-500 text-slate-500 bg-white hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out cursor-pointer"
            >
              Give it a star <FaGithub className="text-lg" />
            </a>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavDropDown;
