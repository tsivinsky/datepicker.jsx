import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { dayjs, Dayjs } from "@/lib/dayjs";
import { Day } from "@/types";

// TODO: make this locale-agnostic
const baseWeekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

export type DatePickerProps = JSX.IntrinsicElements["div"] & {
  date?: Date | Dayjs;
  firstDayOfWeek?: "Monday" | "Sunday";
  onDatePicked: (date: Dayjs) => void;
  classNames?: {
    weekdaysGrid?: string;
    weekday?: string;
    daysGrid?: string;
    day?: string;
  };
};

export const DatePicker: React.FC<DatePickerProps> = ({
  date = dayjs(),
  firstDayOfWeek = "Monday",
  onDatePicked,
  classNames,
  ...props
}) => {
  const [browsingDate, setBrowsingDate] = useState<Dayjs>(dayjs(date));

  useEffect(() => {
    setBrowsingDate(dayjs(date));
  }, [date]);

  const weekdays = useMemo(() => {
    if (firstDayOfWeek === "Sunday") {
      return ["Вс", ...baseWeekDays];
    }

    return [...baseWeekDays, "Вс"];
  }, [firstDayOfWeek]);

  const days = useMemo(() => {
    const days: Array<Day> = [];

    let weekdayOfFirst = browsingDate.date(1).day();
    if (firstDayOfWeek === "Monday") {
      weekdayOfFirst -= 1;
      if (weekdayOfFirst < 0) weekdayOfFirst = 6;
    }

    // Fill days array with last days of previous month
    const prevMonth = browsingDate.subtract(1, "month");
    let lastDayOfPrevMonth = prevMonth.endOf("month").date();
    for (let i = 0; i < weekdayOfFirst; i++) {
      const dayDate = prevMonth.date(lastDayOfPrevMonth);
      days.unshift({
        date: dayDate,
        isToday: false,
        month: "previous",
      });
      lastDayOfPrevMonth--;
    }

    const daysInMonth = browsingDate.daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = browsingDate.date(i);
      days.push({
        date: dayDate,
        isToday: browsingDate.date(i).isSame(dayjs(), "day"),
        month: "current",
      });
    }

    // Append days from next month
    let weekdayOfLast = browsingDate.endOf("month").day();
    const nextMonth = browsingDate.add(1, "month");
    // Only if last day of this month is not sunday
    if (weekdayOfLast !== 0) {
      for (let i = 1; i <= 7 - weekdayOfLast; i++) {
        const dayDate = nextMonth.date(i);
        days.push({
          date: dayDate,
          isToday: false,
          month: "next",
        });
      }
    }

    return days;
  }, [browsingDate, firstDayOfWeek]);

  const handleDayClick = (day: Day) => {
    onDatePicked(day.date);
  };

  return (
    <div {...props}>
      <div
        className={classNames?.weekdaysGrid}
        style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
      >
        {weekdays.map((weekday) => (
          <div key={weekday} className={clsx(classNames?.weekday)}>
            {weekday}
          </div>
        ))}
      </div>

      <div
        className={classNames?.daysGrid}
        style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
      >
        {days.map((day, i) => (
          <button key={i} onClick={() => handleDayClick(day)} className={clsx(classNames?.day)}>
            {day.date.date()}
          </button>
        ))}
      </div>
    </div>
  );
};
