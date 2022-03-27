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
};
```
