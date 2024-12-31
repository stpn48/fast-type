"use client";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ToolbarButton({ className, isActive, ...props }: Props) {
  return (
    <button
      className={twMerge(
        "flex items-center gap-1 text-foreground/60 hover:text-foreground",
        className,
        isActive && "text-foreground",
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}