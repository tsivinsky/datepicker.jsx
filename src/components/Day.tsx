import React from "react";

export type DayProps = JSX.IntrinsicElements["button"] & {};

export const Day: React.FC<DayProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
