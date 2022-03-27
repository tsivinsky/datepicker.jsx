import { Dayjs } from "../lib/dayjs";

export type Day = {
  date: Dayjs;
  isToday: boolean;
  month: "previous" | "current" | "next";
};

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
};
