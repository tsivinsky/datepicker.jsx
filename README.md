# datepicker.jsx

### Install

#### npm

```bash
npm i datepicker.jsx
```

#### yarn

```bash
yarn add datepicker.jsx
```

### Building

```bash
yarn build
```

### Usage

#### TypeScript

> recommended way

```tsx
import { Dayjs } from "dayjs";
import { DatePicker } from "datepicker.jsx";

const App = () => {
  const onDatePicked = (date: Dayjs) => {
    console.log(date);
  };

  return (
    <div>
      <DatePicker onDatePicked={onDatePicked} />
    </div>
  );
};
```

#### JavaScript

```javascript
import { Dayjs } from "dayjs";
import { DatePicker } from "datepicker.jsx";

const App = () => {
  const onDatePicked = (date) => {
    console.log(date);
  };

  return (
    <div>
      <DatePicker onDatePicked={onDatePicked} />
    </div>
  );
};
```

### API

#### [DatePicker](./src/components/DatePicker.tsx)

`DatePicker` takes several props

```typescript
export type DatePickerProps = JSX.IntrinsicElements["div"] & {
  date?: Date | Dayjs;
  firstDayOfWeek?: "Monday" | "Sunday";
  locale?: string;
  onDatePicked: (date: Dayjs) => void;
  classNames?: {
    weekdaysGrid?: string;
    weekday?: string;
    daysGrid?: string;
    day?: string;
  };
  renderDay?: (day: Dayjs) => React.ReactElement;
};
```

How to customize className or other props on every day button you ask.

You can pass function to `renderDay` prop for returning custom element for every day button.

##### Example

```tsx
import { DatePicker, Day } from "datepicker.jsx";

const App = () => {
  return (
    <div>
      <DatePicker
        {...otherProps}
        renderDay={(day) => <Day className="custom-class-name" title="im the title on every day button" />}
      />
    </div>
  );
};
```
