import React, { useEffect } from "react";
import type { FC, ReactNode } from "react";
import "./styles.css";
import TopBar from "../../components/TopBar";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="layout-root">
      <TopBar />
      <div className="layout-wrapper">
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
