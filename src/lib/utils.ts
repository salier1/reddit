import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
  lessThanXSeconds: "刚刚",
  xSeconds: "刚刚",
  halfAMinute: "刚刚",
  lessThanXMinutes: "{{count}}分钟",
  xMinutes: "{{count}}分钟",
  aboutXHours: "{{count}}小时",
  xHours: "{{count}}小时",
  xDays: "{{count}}天",
  aboutXWeeks: "{{count}}周",
  xWeeks: "{{count}}周",
  aboutXMonths: "{{count}}周",
  xMonths: "{{count}}月",
  aboutXYears: "{{count}}年",
  xYears: "{{count}}年",
  overXYears: "{{count}}年",
  almostXYears: "{{count}}年",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " 之前";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}
