import React from "react";
import { Link } from "react-router-dom";
import { GrRestaurant } from "react-icons/gr";
import { PiShoppingCartThin } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import { SlideNav } from "./SlideNav";
import ResponsiveMenu from "./ResponsiveMenu";
import SwitchMode from "../Switchmode/SwitchMode";
import NavButton from "../Button/NavButton";

const Navbar = ({ theme, setTheme }) => {
  const [open, setOpen] = React.useState(false);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav>
        <div className="container flex justify-between items-center py-2">
          {/* Logo Section */}
          <Link
            to="/"
            className="text-2xl flex items-center gap-2 font-bold uppercase"
          >
            <GrRestaurant />
            <p>Restaurant</p>
            <p className="text-secondary">Koala</p>
          </Link>

          {/* SlideNav Section for Desktop */}
          <div className="hidden md:block">
            <SlideNav />
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-4">
            <SwitchMode selected={theme} setSelected={setTheme} />{" "}
            {/* Position SwitchMode here */}
            <Link
              to="/cart"
              className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200"
            >
              <PiShoppingCartThin />
            </Link>
            {/* Link for Login Button */}
            <Link to="/login">
              <NavButton />
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Section */}
      <ResponsiveMenu open={open} handleScrollTo={handleScrollTo} />
    </>
  );
};

export default Navbar;
