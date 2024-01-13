import React, { useState } from "react";
import "./styles.css";
import { BiHomeAlt as HomeIcon } from "react-icons/bi";
import { FiMessageCircle as MessagesIcon } from "react-icons/fi";
import { IconType } from "react-icons";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactElement<IconType>;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <div className={`nav-item${active ? " clicked" : ""}`} onClick={onClick}>
    {icon}
    <span className="nav-label">{label}</span>
  </div>
);

const TopBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: "Home", icon: <HomeIcon />, name: "home", to: "/" },
    {
      label: "Favorites",
      icon: <MessagesIcon />,
      name: "favorites",
      to: "/favorites",
    },
  ];

  return (
    <div className="topbar-container">
      <div className="topbar-content">
        <div className="navbar-content">
          {navItems.map((item) => (
            <RouterLink to={item.to} key={item.name} className="router-link">
              <NavItem
                icon={item.icon}
                label={item.label}
                active={currentPath === item.to}
                onClick={() => {}}
              />
            </RouterLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
