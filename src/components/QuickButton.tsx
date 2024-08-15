import { quicksIcon } from "@/assets";
import { cn } from "../lib/utils";
import React from "react";

const QuickButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn("bg-primary rounded-full flex items-center justify-center w-[68px] h-[68px] active:scale-95 transition-all ease-in z-10", className)}
        {...props}
      >
        <img src={quicksIcon} alt="Quicks Icon" />
      </button>
    );
  }
);

export default QuickButton;