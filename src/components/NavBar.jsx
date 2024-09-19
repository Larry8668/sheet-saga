import React from "react";
import { motion } from "framer-motion";
import NavDropDown from "./NavDropDown";
import logo from "../assets/sheet-saga-logo.png";
import { FaGithub } from "react-icons/fa";

const routes = [
  {
    name: "Home",
    key: "home",
    href: "/",
  },
  {
    name: "Logs",
    key: "logs",
    href: "/logs",
  },
  {
    name: "Update",
    key: "update",
    href: "/update",
  },
];

const NavBar = () => {
  return (
    <motion.div
      className="bg-transparent backdrop-blur-md sticky top-5 w-[80%] mx-auto text-black shadow-xl rounded-xl z-[1100]"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="flex justify-between items-center px-4 md:px-8 h-12 md:h-20 overflow-hidden">
        <a className="text-md md:text-2xl font-bold cursor-pointer" href="/">
          <img src={logo} className="w-24 md:w-44" />
        </a>
        <div className="md:flex justify-center items-center gap-8 hidden font-semibold">
          {routes.map((route) => (
            <a
              key={route.key}
              className="cursor-pointer hover:text-blue-500 transition-colors duration-200"
              href={route.href}
            >
              {route.name}
            </a>
          ))}
          <a
            href="https://github.com/Larry8668/sheet-saga"
            target="_blank"
            className="flex items-center justify-center p-2 gap-2 text-sm rounded border-2 border-slate-500 text-slate-500 bg-white hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out cursor-pointer"
          >
            Give it a star <FaGithub className="text-lg" />
          </a>
        </div>
        <NavDropDown routes={routes} />
      </div>
    </motion.div>
  );
};

export default NavBar;
