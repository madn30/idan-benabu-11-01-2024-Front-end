import "./styles.css";
import type { FC } from "react";

type LoaderProps = {
  size?: string | number;
  margin?: number;
};
const Loader: FC<LoaderProps> = ({ size, margin }) => {
  return (
    <div className="loader-container" style={{ margin }}>
      <div
        style={{ height: `${size}px`, width: `${size}px` }}
        className="loader"
      ></div>
    </div>
  );
};

export default Loader;
