import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, Day } from "../../src";

type FirstDayOfWeek = "Monday" | "Sunday";

export default function App() {
  const [date, setDate] = useState(dayjs());
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<FirstDayOfWeek>("Monday");
  const [locale, setLocale] = useState(window.navigator.language);

  const onDatePicked = (date: Dayjs) => {
    console.log(date.format("YYYY-MM-DD"));
  };

  const toggleFirstDayOfWeek = () => {
    if (firstDayOfWeek === "Monday") {
      setFirstDayOfWeek("Sunday");
    } else {
      setFirstDayOfWeek("Monday");
    }
  };

  const goToPrevMonth = () => setDate((date) => date.subtract(1, "month"));
  const goToNextMonth = () => setDate((date) => date.add(1, "month"));

  const toggleLocale = () => {
    if (locale !== "ru-RU") {
      setLocale("ru-RU");
    } else {
      setLocale("en-US");
    }
  };

  return (
    <div>
      <h1>datepicker.jsx</h1>

      <button className="border rounded-md px-4 py-1 m-2" onClick={toggleFirstDayOfWeek}>
        Toggle first day of the week
      </button>
      <button className="border rounded-md px-4 py-1 m-2" onClick={goToPrevMonth}>
        Previous month
      </button>
      <button className="border rounded-md px-4 py-1 m-2" onClick={goToNextMonth}>
        Next month
      </button>
      <button className="border rounded-md px-4 py-1 m-2" onClick={toggleLocale}>
        Toggle locale
      </button>

      <h3>{date.toDate().toLocaleDateString("ru-RU", { month: "long" })}</h3>

      <DatePicker
        date={date}
        onDatePicked={onDatePicked}
        firstDayOfWeek={firstDayOfWeek}
        locale={locale}
        className="w-72 h-72"
        classNames={{
          weekdaysGrid: "gap-x-[10px]",
          weekday: "w-9 h-9 text-center font-bold",
          daysGrid: "gap-[10px]",
        }}
        renderDay={() => <Day className="w-9 h-9 bg-blue-200 rounded-full" />}
      />
    </div>
  );
}
