import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navItems, profile } from "../data/portfolioData";
import NavDrawer from "./NavDrawer";
import useMediaQuery from "../hooks/useMediaQuery";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <nav className="flex items-center h-[46px] px-[18px] border-b border-border bg-bg-panel shrink-0 gap-[22px]">
        <NavLink to="/" className="text-text-dim text-[12.5px] tracking-[0.3px] whitespace-nowrap no-underline">
          {profile.handle}
        </NavLink>

        {isDesktop && (
          <>
            <div className="flex gap-5 ml-6">
              {navItems.map((n) => (
                <NavLink
                  key={n.key}
                  to={n.key === "hello" ? "/" : `/${n.key}`}
                  className={({ isActive }) =>
                    `text-[12.5px] font-mono cursor-pointer pt-[15px] pb-[15px] relative whitespace-nowrap no-underline ${
                      isActive ? "text-text after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-orange" : "text-text-dim hover:text-text"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </div>

            <div className="ml-auto">
              <NavLink
                to="/contact-me"
                className={({ isActive }) =>
                  `text-[12.5px] no-underline font-mono ${isActive ? "text-teal" : "text-text-dim hover:text-teal"}`
                }
              >
                _contact-me
              </NavLink>
            </div>
          </>
        )}

        {!isDesktop && (
          <button
            onClick={() => setDrawerOpen(true)}
            className="ml-auto bg-none border-none text-text-dim cursor-pointer p-1"
          >
            {drawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </nav>

      <NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
