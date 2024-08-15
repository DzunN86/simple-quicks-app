import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateDaysLeft = (dateline: Date | string) => {
  if (!dateline) return null;
  const currentDate = new Date();
  const deadlineDate = new Date(dateline);
  const timeDiff = deadlineDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (daysLeft === 0) {
    return "Due Today";
  }

  if (daysLeft && daysLeft < 0) {
    return "Overdue";
  }

  if (daysLeft === 1) {
    return "Due Tomorrow";
  }
  // 1 - 6 days
  if (daysLeft && daysLeft > 0 && daysLeft < 7) {
    return daysLeft === 1 ? "1 Day Left" : `${daysLeft} Days Left`;
  }

  return null;
};
