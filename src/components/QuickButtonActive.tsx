import React from "react";
import { cn } from "../lib/utils";

const QuickButtonActive = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className,
  children,
  ...props }, ref) => {
  return (
      <button ref={ref} className={cn("h-[68px] w-[68px] rounded-full flex items-center justify-center  before:bg-primary-gray before:rounded-full before:absolute before:inset-0 before:z-[-1] before:-translate-x-3 before:transform", className)} {...props}>
        {children}
      </button>
  );
});

export default QuickButtonActive;
