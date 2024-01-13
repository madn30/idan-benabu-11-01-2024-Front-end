import React from "react";
import type { FC } from "react";
import "./styles.css";

type ErrorLabelProps = {
  msg: string;
  center?: boolean;
};

const ErrorLabel: FC<ErrorLabelProps> = ({ msg, center }) => {
  if (!msg) return <React.Fragment />;

  const className = `error-label${center ? " center" : ""}`;

  return <div className={className}>{msg}</div>;
};

export default ErrorLabel;
