import * as React from "react";

import { cn } from "@/lib/utils";
import SearchIcon from "@/components/Icon/SearchIcon";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          type === "search" ? "pl-4 pe-10" : "px-3",
          className
        )}
        ref={ref}
        {...props}
      />
      {type === "search" && <SearchIcon className="absolute top-3 right-3 fill-current text-muted-foreground w-4 h-4" />}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
