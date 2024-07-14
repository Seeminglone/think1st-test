import dayjs from "dayjs";

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateForm = (
  data: { firstName: string; lastName: string; email: string },
  fileName: string,
  date: dayjs.Dayjs | null,
  time: string
) => {
  return (
    data.firstName !== "" &&
    data.lastName !== "" &&
    data.email !== "" &&
    fileName !== "" &&
    date !== null &&
    time !== ""
  );
};
