import { Dayjs } from "@/lib/dayjs";

export type Day = {
  date: Dayjs;
  isToday: boolean;
  month: "previous" | "current" | "next";
};
