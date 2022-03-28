import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { dayjs, Dayjs } from "../lib/dayjs";
import { Day } from "./Day";

export type DatePickerProps = JSX.IntrinsicElements["div"] & {
  /** if you want to control date inside DatePicker component, you can pass here React state */
  date?: Date | Dayjs;

  /** name is self-explanatory, change first day of the week
   *
   * @default "Monday"
   */
  firstDayOfWeek?: "Monday" | "Sunday";

  /**
   * change language for weekdays
   *
   * @default window.navigator.language
   */
  locale?: string;

  /**
   * callback function, which runs after end user clicks on any day
   */
  onDatePicked: (date: Dayjs) => void;

  /**
   * object for you to provide custom classes for different parts of a component
   */
  classNames?: {
    weekdaysGrid?: string;
    weekday?: string;
    daysGrid?: string;
    day?: string;
  };

  /**
   * function for customizing day buttons in DatePicker
   *
   * @param {Dayjs} day
   * @returns {React.ReactElement}
   */
  renderDay?: (day: Dayjs) => React.ReactElement;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  date = dayjs(),
  firstDayOfWeek = "Monday",
  locale = window.navigator.language,
  onDatePicked,
  classNames,
  renderDay,
  ...props
}) => {
  const [browsingDate, setBrowsingDate] = useState<Dayjs>(dayjs(date));

  useEffect(() => {
    setBrowsingDate(dayjs(date));
  }, [date]);

  const weekdays = useMemo(() => {
    let weekdays = [];

    for (let i = firstDayOfWeek === "Monday" ? 1 : 0; (firstDayOfWeek === "Monday" && i <= 7) || i < 7; i++) {
      weekdays.push(dayjs().day(i).toDate().toLocaleDateString(locale, { weekday: "short" }));
    }

    return weekdays;
  }, [firstDayOfWeek, locale]);

  const days = useMemo(() => {
    const days: Array<Dayjs> = [];

    let weekdayOfFirst = browsingDate.date(1).day();
    if (firstDayOfWeek === "Monday") {
      weekdayOfFirst -= 1;
      if (weekdayOfFirst < 0) weekdayOfFirst = 6;
    }

    // Fill days array with last days of previous month
    const prevMonth = browsingDate.subtract(1, "month");
    let lastDayOfPrevMonth = prevMonth.endOf("month").date();
    for (let i = 0; i < weekdayOfFirst; i++) {
      days.unshift(prevMonth.date(lastDayOfPrevMonth));
      lastDayOfPrevMonth--;
    }

    const daysInMonth = browsingDate.daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(browsingDate.date(i));
    }

    // Append days from next month
    let weekdayOfLast = browsingDate.endOf("month").day();
    const nextMonth = browsingDate.add(1, "month");
    // Only if last day of this month is not sunday
    if (weekdayOfLast !== 0) {
      for (let i = 1; i <= 7 - weekdayOfLast; i++) {
        days.push(nextMonth.date(i));
      }
    }

    return days;
  }, [browsingDate, firstDayOfWeek]);

  const handleDayClick = (day: Dayjs) => {
    onDatePicked(day);
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
        {days.map((day, i) => {
          if (renderDay) {
            const element = React.Children.only(renderDay(day));

            return React.cloneElement(
              element,
              { onClick: () => handleDayClick(day) },
              <>{element.props.children ?? day.date()}</>
            );
          }

          return (
            <Day key={i} className={classNames?.day} onClick={() => handleDayClick(day)}>
              {day.date()}
            </Day>
          );
        })}
      </div>
    </div>
  );
};
