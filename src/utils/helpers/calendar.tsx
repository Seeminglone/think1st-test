import dayjs from "dayjs";

interface Holiday {
  name: string;
  date: string;
  type: string;
}

const isPublicHoliday = (date: dayjs.Dayjs, holidays: Holiday[]): boolean => {
  return holidays.some(
    (holiday) =>
      dayjs(holiday.date).isSame(date, "day") &&
      holiday.type === "PUBLIC_HOLIDAY"
  );
};

const isSunday = (date: dayjs.Dayjs): boolean => {
  return date.day() === 0;
};

export const shouldDisableDate = (
  date: dayjs.Dayjs,
  holidays: Holiday[]
): boolean => {
  return isPublicHoliday(date, holidays) || isSunday(date);
};
